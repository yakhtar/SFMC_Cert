#!/usr/bin/env node

/**
 * Quiz Engine MCP Server
 * Advanced quiz management with analytics, adaptive learning, and performance tracking
 * 
 * Features:
 * - Intelligent question selection based on performance
 * - Real-time analytics and progress tracking
 * - Adaptive difficulty adjustment
 * - Comprehensive reporting and insights
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

class QuizEngineMCP {
  constructor() {
    this.server = new Server(
      {
        name: "quiz-engine-mcp",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );
    
    // Quiz session management
    this.activeSessions = new Map();
    
    // Analytics and tracking
    this.analytics = {
      totalSessions: 0,
      totalQuestions: 0,
      totalCorrectAnswers: 0,
      averageScore: 0,
      popularTopics: new Map(),
      difficultyDistribution: new Map()
    };
    
    this.setupToolHandlers();
  }
  
  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "create_quiz_session",
          description: "Create a new adaptive quiz session",
          inputSchema: {
            type: "object",
            properties: {
              userId: {
                type: "string",
                description: "Unique identifier for the user"
              },
              certificationName: {
                type: "string",
                description: "Name of the certification"
              },
              difficulty: {
                type: "string",
                enum: ["adaptive", "beginner", "intermediate", "advanced"],
                description: "Difficulty level or adaptive mode"
              },
              questionCount: {
                type: "number",
                description: "Number of questions for the session"
              },
              timeLimit: {
                type: "number",
                description: "Time limit in minutes (optional)"
              },
              topics: {
                type: "array",
                items: { type: "string" },
                description: "Specific topics to focus on (optional)"
              }
            },
            required: ["userId", "certificationName"]
          }
        },
        {
          name: "get_next_question",
          description: "Get the next optimal question for a quiz session",
          inputSchema: {
            type: "object",
            properties: {
              sessionId: {
                type: "string",
                description: "Quiz session identifier"
              },
              previousAnswer: {
                type: "object",
                properties: {
                  questionId: { type: "string" },
                  selectedAnswer: { type: "string" },
                  isCorrect: { type: "boolean" },
                  timeSpent: { type: "number" }
                },
                description: "Previous question response (optional)"
              }
            },
            required: ["sessionId"]
          }
        },
        {
          name: "submit_answer",
          description: "Submit an answer and get immediate feedback",
          inputSchema: {
            type: "object",
            properties: {
              sessionId: {
                type: "string",
                description: "Quiz session identifier"
              },
              questionId: {
                type: "string",
                description: "Question identifier"
              },
              selectedAnswer: {
                type: "string",
                description: "Selected answer (A, B, C, D)"
              },
              timeSpent: {
                type: "number",
                description: "Time spent on question in seconds"
              }
            },
            required: ["sessionId", "questionId", "selectedAnswer"]
          }
        },
        {
          name: "get_session_analytics",
          description: "Get comprehensive analytics for a quiz session",
          inputSchema: {
            type: "object",
            properties: {
              sessionId: {
                type: "string",
                description: "Quiz session identifier"
              },
              includeRecommendations: {
                type: "boolean",
                description: "Include learning recommendations"
              }
            },
            required: ["sessionId"]
          }
        },
        {
          name: "generate_performance_report",
          description: "Generate detailed performance report for user",
          inputSchema: {
            type: "object",
            properties: {
              userId: {
                type: "string",
                description: "User identifier"
              },
              timeframe: {
                type: "string",
                enum: ["week", "month", "quarter", "all"],
                description: "Timeframe for the report"
              },
              certificationName: {
                type: "string",
                description: "Specific certification (optional)"
              }
            },
            required: ["userId"]
          }
        },
        {
          name: "adaptive_difficulty_adjustment",
          description: "Adjust difficulty based on user performance",
          inputSchema: {
            type: "object",
            properties: {
              sessionId: {
                type: "string",
                description: "Quiz session identifier"
              },
              performanceMetrics: {
                type: "object",
                description: "Current performance metrics"
              }
            },
            required: ["sessionId"]
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      try {
        switch (name) {
          case "create_quiz_session":
            return await this.createQuizSession(args);
          case "get_next_question":
            return await this.getNextQuestion(args);
          case "submit_answer":
            return await this.submitAnswer(args);
          case "get_session_analytics":
            return await this.getSessionAnalytics(args);
          case "generate_performance_report":
            return await this.generatePerformanceReport(args);
          case "adaptive_difficulty_adjustment":
            return await this.adaptiveDifficultyAdjustment(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error.message}`
            }
          ]
        };
      }
    });
  }
  
  async createQuizSession({ userId, certificationName, difficulty = "adaptive", questionCount = 20, timeLimit, topics }) {
    try {
      const sessionId = uuidv4();
      
      const session = {
        sessionId: sessionId,
        userId: userId,
        certificationName: certificationName,
        difficulty: difficulty,
        questionCount: questionCount,
        timeLimit: timeLimit,
        topics: topics || [],
        createdAt: new Date().toISOString(),
        status: "active",
        currentQuestionIndex: 0,
        questionsAnswered: 0,
        correctAnswers: 0,
        totalTimeSpent: 0,
        questions: [],
        answers: [],
        adaptiveLevel: difficulty === "adaptive" ? "intermediate" : difficulty,
        performanceMetrics: {
          accuracy: 0,
          averageTimePerQuestion: 0,
          strongTopics: [],
          weakTopics: [],
          difficultyProgression: []
        }
      };
      
      // Store session
      this.activeSessions.set(sessionId, session);
      
      // Load questions for session
      await this.loadQuestionsForSession(session);
      
      // Save session to disk
      await this.saveSession(session);
      
      // Update global analytics
      this.analytics.totalSessions++;
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              sessionId: sessionId,
              message: "Quiz session created successfully",
              sessionDetails: {
                certification: certificationName,
                difficulty: difficulty,
                questionCount: questionCount,
                timeLimit: timeLimit,
                topics: topics
              }
            }, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new Error(`Failed to create quiz session: ${error.message}`);
    }
  }
  
  async getNextQuestion({ sessionId, previousAnswer }) {
    try {
      const session = this.activeSessions.get(sessionId);
      if (!session) {
        throw new Error(`Session not found: ${sessionId}`);
      }
      
      // Process previous answer if provided
      if (previousAnswer) {
        await this.processPreviousAnswer(session, previousAnswer);
      }
      
      // Check if session is complete
      if (session.currentQuestionIndex >= session.questionCount || session.currentQuestionIndex >= session.questions.length) {
        await this.completeSession(session);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                sessionComplete: true,
                finalScore: this.calculateFinalScore(session),
                analytics: session.performanceMetrics
              }, null, 2)
            }
          ]
        };
      }
      
      // Get next question (with adaptive selection if enabled)
      const nextQuestion = await this.selectNextQuestion(session);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(nextQuestion, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new Error(`Failed to get next question: ${error.message}`);
    }
  }
  
  async submitAnswer({ sessionId, questionId, selectedAnswer, timeSpent = 0 }) {
    try {
      const session = this.activeSessions.get(sessionId);
      if (!session) {
        throw new Error(`Session not found: ${sessionId}`);
      }
      
      // Find the question
      const question = session.questions.find(q => q.id === questionId);
      if (!question) {
        throw new Error(`Question not found: ${questionId}`);
      }
      
      // Evaluate answer
      const isCorrect = selectedAnswer === question.correctAnswer;
      
      // Create answer record
      const answerRecord = {
        questionId: questionId,
        question: question.question,
        selectedAnswer: selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect: isCorrect,
        timeSpent: timeSpent,
        timestamp: new Date().toISOString(),
        difficulty: question.difficulty,
        topic: question.concept
      };
      
      // Add to session
      session.answers.push(answerRecord);
      session.questionsAnswered++;
      session.totalTimeSpent += timeSpent;
      
      if (isCorrect) {
        session.correctAnswers++;
      }
      
      // Update performance metrics
      this.updatePerformanceMetrics(session, answerRecord);
      
      // Prepare feedback
      const feedback = {
        isCorrect: isCorrect,
        explanation: question.explanation,
        incorrectExplanations: question.incorrectExplanations,
        keyPoints: question.keyPoints,
        score: {
          current: session.correctAnswers,
          total: session.questionsAnswered,
          percentage: Math.round((session.correctAnswers / session.questionsAnswered) * 100)
        },
        timeSpent: timeSpent,
        averageTime: Math.round(session.totalTimeSpent / session.questionsAnswered),
        nextQuestionAvailable: session.currentQuestionIndex + 1 < session.questionCount
      };
      
      // Update global analytics
      this.analytics.totalQuestions++;
      if (isCorrect) {
        this.analytics.totalCorrectAnswers++;
      }
      
      // Save session
      await this.saveSession(session);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(feedback, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new Error(`Failed to submit answer: ${error.message}`);
    }
  }
  
  async getSessionAnalytics({ sessionId, includeRecommendations = true }) {
    try {
      const session = this.activeSessions.get(sessionId);
      if (!session) {
        throw new Error(`Session not found: ${sessionId}`);
      }
      
      const analytics = {
        sessionId: sessionId,
        overview: {
          questionsAnswered: session.questionsAnswered,
          correctAnswers: session.correctAnswers,
          accuracy: session.questionsAnswered > 0 ? Math.round((session.correctAnswers / session.questionsAnswered) * 100) : 0,
          totalTimeSpent: session.totalTimeSpent,
          averageTimePerQuestion: session.questionsAnswered > 0 ? Math.round(session.totalTimeSpent / session.questionsAnswered) : 0
        },
        topicPerformance: this.analyzeTopicPerformance(session),
        difficultyProgression: session.performanceMetrics.difficultyProgression,
        timeAnalysis: this.analyzeTimeSpent(session),
        strengths: session.performanceMetrics.strongTopics,
        weaknesses: session.performanceMetrics.weakTopics
      };
      
      if (includeRecommendations) {
        analytics.recommendations = this.generateRecommendations(session);
      }
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(analytics, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new Error(`Failed to get session analytics: ${error.message}`);
    }
  }
  
  async generatePerformanceReport({ userId, timeframe = "all", certificationName }) {
    try {
      // Load user sessions
      const userSessions = await this.loadUserSessions(userId, timeframe, certificationName);
      
      if (userSessions.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ message: "No sessions found for user" }, null, 2)
            }
          ]
        };
      }
      
      const report = {
        userId: userId,
        timeframe: timeframe,
        reportGenerated: new Date().toISOString(),
        summary: {
          totalSessions: userSessions.length,
          totalQuestions: 0,
          totalCorrectAnswers: 0,
          overallAccuracy: 0,
          totalStudyTime: 0,
          averageSessionScore: 0
        },
        progressOverTime: [],
        topicMastery: new Map(),
        recommendations: [],
        achievements: []
      };
      
      // Calculate summary statistics
      for (const session of userSessions) {
        report.summary.totalQuestions += session.questionsAnswered;
        report.summary.totalCorrectAnswers += session.correctAnswers;
        report.summary.totalStudyTime += session.totalTimeSpent;
        
        // Track progress over time
        report.progressOverTime.push({
          date: session.createdAt,
          accuracy: session.questionsAnswered > 0 ? (session.correctAnswers / session.questionsAnswered) * 100 : 0,
          questionsAnswered: session.questionsAnswered
        });
        
        // Analyze topic performance
        for (const answer of session.answers) {
          if (!report.topicMastery.has(answer.topic)) {
            report.topicMastery.set(answer.topic, { correct: 0, total: 0 });
          }
          const topic = report.topicMastery.get(answer.topic);
          topic.total++;
          if (answer.isCorrect) {
            topic.correct++;
          }
        }
      }
      
      // Calculate overall accuracy
      report.summary.overallAccuracy = report.summary.totalQuestions > 0 ? 
        Math.round((report.summary.totalCorrectAnswers / report.summary.totalQuestions) * 100) : 0;
      
      // Calculate average session score
      report.summary.averageSessionScore = userSessions.length > 0 ?
        Math.round(userSessions.reduce((sum, session) => 
          sum + (session.questionsAnswered > 0 ? (session.correctAnswers / session.questionsAnswered) * 100 : 0), 0) / userSessions.length) : 0;
      
      // Convert Map to Object for JSON serialization
      report.topicMastery = Object.fromEntries(
        Array.from(report.topicMastery.entries()).map(([topic, stats]) => [
          topic,
          {
            ...stats,
            accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
          }
        ])
      );
      
      // Generate recommendations
      report.recommendations = this.generateUserRecommendations(report);
      
      // Generate achievements
      report.achievements = this.generateAchievements(report);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(report, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new Error(`Failed to generate performance report: ${error.message}`);
    }
  }
  
  async adaptiveDifficultyAdjustment({ sessionId, performanceMetrics }) {
    try {
      const session = this.activeSessions.get(sessionId);
      if (!session) {
        throw new Error(`Session not found: ${sessionId}`);
      }
      
      if (session.difficulty !== "adaptive") {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ message: "Session is not in adaptive mode" }, null, 2)
            }
          ]
        };
      }
      
      // Analyze performance and adjust difficulty
      const currentAccuracy = session.questionsAnswered > 0 ? (session.correctAnswers / session.questionsAnswered) : 0.5;
      const recentAccuracy = this.calculateRecentAccuracy(session, 5); // Last 5 questions
      
      let newLevel = session.adaptiveLevel;
      let adjustment = "none";
      
      // Difficulty adjustment logic
      if (recentAccuracy >= 0.8 && currentAccuracy >= 0.75) {
        // User is performing well, increase difficulty
        if (session.adaptiveLevel === "beginner") {
          newLevel = "intermediate";
          adjustment = "increased";
        } else if (session.adaptiveLevel === "intermediate") {
          newLevel = "advanced";
          adjustment = "increased";
        }
      } else if (recentAccuracy <= 0.4 && currentAccuracy <= 0.5) {
        // User is struggling, decrease difficulty
        if (session.adaptiveLevel === "advanced") {
          newLevel = "intermediate";
          adjustment = "decreased";
        } else if (session.adaptiveLevel === "intermediate") {
          newLevel = "beginner";
          adjustment = "decreased";
        }
      }
      
      session.adaptiveLevel = newLevel;
      session.performanceMetrics.difficultyProgression.push({
        timestamp: new Date().toISOString(),
        fromLevel: session.adaptiveLevel,
        toLevel: newLevel,
        reason: `Accuracy: ${Math.round(currentAccuracy * 100)}%, Recent: ${Math.round(recentAccuracy * 100)}%`
      });
      
      await this.saveSession(session);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              adjustment: adjustment,
              previousLevel: session.adaptiveLevel,
              newLevel: newLevel,
              currentAccuracy: Math.round(currentAccuracy * 100),
              recentAccuracy: Math.round(recentAccuracy * 100),
              message: adjustment === "none" ? "No adjustment needed" : `Difficulty ${adjustment} to ${newLevel}`
            }, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new Error(`Failed to adjust difficulty: ${error.message}`);
    }
  }
  
  // Helper methods
  async loadQuestionsForSession(session) {
    // Mock question loading - in real implementation, load from question bank
    const mockQuestions = this.generateMockQuestions(session.questionCount, session.adaptiveLevel, session.topics);
    session.questions = mockQuestions;
  }
  
  generateMockQuestions(count, difficulty, topics) {
    const questions = [];
    
    for (let i = 0; i < count; i++) {
      const questionTopics = topics.length > 0 ? topics : ["SQL Basics", "Database Design", "Query Optimization"];
      const topic = questionTopics[i % questionTopics.length];
      
      questions.push({
        id: `q_${i + 1}`,
        question: `Sample ${difficulty} level question about ${topic}`,
        concept: topic,
        difficulty: difficulty,
        options: [
          { letter: "A", text: "Correct answer", correct: true },
          { letter: "B", text: "Incorrect option 1", correct: false },
          { letter: "C", text: "Incorrect option 2", correct: false },
          { letter: "D", text: "Incorrect option 3", correct: false }
        ],
        correctAnswer: "A",
        explanation: "This is the correct answer because...",
        incorrectExplanations: {
          "B": "This is wrong because...",
          "C": "This is incorrect due to...",
          "D": "This option fails because..."
        },
        keyPoints: ["Key point 1", "Key point 2", "Key point 3"]
      });
    }
    
    return questions;
  }
  
  async processPreviousAnswer(session, previousAnswer) {
    // Update session state based on previous answer
    session.currentQuestionIndex++;
  }
  
  async selectNextQuestion(session) {
    if (session.currentQuestionIndex >= session.questions.length) {
      return null;
    }
    
    const nextQuestion = session.questions[session.currentQuestionIndex];
    
    // If adaptive mode, potentially adjust question difficulty
    if (session.difficulty === "adaptive") {
      // Could implement smart question selection here
    }
    
    return {
      questionId: nextQuestion.id,
      questionNumber: session.currentQuestionIndex + 1,
      totalQuestions: session.questionCount,
      question: nextQuestion.question,
      concept: nextQuestion.concept,
      difficulty: nextQuestion.difficulty,
      options: nextQuestion.options,
      timeRemaining: session.timeLimit ? this.calculateTimeRemaining(session) : null
    };
  }
  
  updatePerformanceMetrics(session, answerRecord) {
    const metrics = session.performanceMetrics;
    
    // Update accuracy
    metrics.accuracy = (session.correctAnswers / session.questionsAnswered) * 100;
    
    // Update average time
    metrics.averageTimePerQuestion = session.totalTimeSpent / session.questionsAnswered;
    
    // Track topic performance
    const topic = answerRecord.topic;
    if (answerRecord.isCorrect) {
      if (!metrics.strongTopics.includes(topic)) {
        // Check if this topic has good performance
        const topicAnswers = session.answers.filter(a => a.topic === topic);
        const topicAccuracy = topicAnswers.filter(a => a.isCorrect).length / topicAnswers.length;
        if (topicAccuracy >= 0.8) {
          metrics.strongTopics.push(topic);
          // Remove from weak topics if present
          metrics.weakTopics = metrics.weakTopics.filter(t => t !== topic);
        }
      }
    } else {
      if (!metrics.weakTopics.includes(topic)) {
        // Check if this topic has poor performance
        const topicAnswers = session.answers.filter(a => a.topic === topic);
        const topicAccuracy = topicAnswers.filter(a => a.isCorrect).length / topicAnswers.length;
        if (topicAccuracy <= 0.4) {
          metrics.weakTopics.push(topic);
          // Remove from strong topics if present
          metrics.strongTopics = metrics.strongTopics.filter(t => t !== topic);
        }
      }
    }
  }
  
  calculateFinalScore(session) {
    return {
      questionsAnswered: session.questionsAnswered,
      correctAnswers: session.correctAnswers,
      accuracy: session.questionsAnswered > 0 ? Math.round((session.correctAnswers / session.questionsAnswered) * 100) : 0,
      totalTimeSpent: session.totalTimeSpent,
      averageTimePerQuestion: session.questionsAnswered > 0 ? Math.round(session.totalTimeSpent / session.questionsAnswered) : 0,
      passed: session.questionsAnswered > 0 && (session.correctAnswers / session.questionsAnswered) >= 0.7
    };
  }
  
  calculateRecentAccuracy(session, questionCount) {
    const recentAnswers = session.answers.slice(-questionCount);
    if (recentAnswers.length === 0) return 0.5; // Default neutral
    return recentAnswers.filter(a => a.isCorrect).length / recentAnswers.length;
  }
  
  analyzeTopicPerformance(session) {
    const topicPerformance = new Map();
    
    for (const answer of session.answers) {
      if (!topicPerformance.has(answer.topic)) {
        topicPerformance.set(answer.topic, { correct: 0, total: 0, averageTime: 0 });
      }
      
      const performance = topicPerformance.get(answer.topic);
      performance.total++;
      performance.averageTime += answer.timeSpent;
      
      if (answer.isCorrect) {
        performance.correct++;
      }
    }
    
    // Calculate accuracy and average time for each topic
    const result = {};
    for (const [topic, perf] of topicPerformance.entries()) {
      result[topic] = {
        accuracy: Math.round((perf.correct / perf.total) * 100),
        questionsAnswered: perf.total,
        averageTime: Math.round(perf.averageTime / perf.total)
      };
    }
    
    return result;
  }
  
  analyzeTimeSpent(session) {
    if (session.answers.length === 0) {
      return { message: "No answers recorded yet" };
    }
    
    const times = session.answers.map(a => a.timeSpent);
    const sortedTimes = times.sort((a, b) => a - b);
    
    return {
      average: Math.round(times.reduce((sum, time) => sum + time, 0) / times.length),
      median: sortedTimes[Math.floor(sortedTimes.length / 2)],
      fastest: Math.min(...times),
      slowest: Math.max(...times),
      total: session.totalTimeSpent
    };
  }
  
  generateRecommendations(session) {
    const recommendations = [];
    const accuracy = session.questionsAnswered > 0 ? (session.correctAnswers / session.questionsAnswered) : 0;
    
    if (accuracy < 0.6) {
      recommendations.push({
        type: "study",
        priority: "high",
        message: "Focus on fundamental concepts before attempting more questions"
      });
    }
    
    if (session.performanceMetrics.weakTopics.length > 0) {
      recommendations.push({
        type: "topic_focus",
        priority: "medium",
        message: `Review these weak areas: ${session.performanceMetrics.weakTopics.join(", ")}`
      });
    }
    
    if (session.performanceMetrics.averageTimePerQuestion > 120) {
      recommendations.push({
        type: "time_management",
        priority: "medium",
        message: "Work on improving response time - practice with time limits"
      });
    }
    
    return recommendations;
  }
  
  generateUserRecommendations(report) {
    const recommendations = [];
    
    if (report.summary.overallAccuracy < 70) {
      recommendations.push("Focus on fundamental concepts before taking more practice exams");
    }
    
    // Find weakest topics
    const weakTopics = Object.entries(report.topicMastery)
      .filter(([topic, stats]) => stats.accuracy < 60)
      .map(([topic]) => topic);
    
    if (weakTopics.length > 0) {
      recommendations.push(`Study these topics: ${weakTopics.join(", ")}`);
    }
    
    if (report.summary.totalStudyTime < 3600) { // Less than 1 hour
      recommendations.push("Increase study time for better retention");
    }
    
    return recommendations;
  }
  
  generateAchievements(report) {
    const achievements = [];
    
    if (report.summary.totalQuestions >= 100) {
      achievements.push("Century Club - Answered 100+ questions");
    }
    
    if (report.summary.overallAccuracy >= 90) {
      achievements.push("Expert Level - 90%+ overall accuracy");
    }
    
    if (report.summary.totalSessions >= 10) {
      achievements.push("Dedicated Learner - 10+ study sessions");
    }
    
    return achievements;
  }
  
  calculateTimeRemaining(session) {
    if (!session.timeLimit) return null;
    const elapsed = Math.floor((Date.now() - new Date(session.createdAt).getTime()) / 1000);
    return Math.max(0, (session.timeLimit * 60) - elapsed);
  }
  
  async completeSession(session) {
    session.status = "completed";
    session.completedAt = new Date().toISOString();
    await this.saveSession(session);
  }
  
  async saveSession(session) {
    const sessionPath = `./quiz-data/sessions/${session.userId}/${session.sessionId}.json`;
    await this.ensureDirectoryExists(path.dirname(sessionPath));
    await fs.writeFile(sessionPath, JSON.stringify(session, null, 2));
  }
  
  async loadUserSessions(userId, timeframe, certificationName) {
    try {
      const userDir = `./quiz-data/sessions/${userId}`;
      const files = await fs.readdir(userDir);
      
      const sessions = [];
      for (const file of files) {
        if (file.endsWith('.json')) {
          const sessionData = await fs.readFile(path.join(userDir, file), 'utf8');
          const session = JSON.parse(sessionData);
          
          // Apply filters
          if (certificationName && session.certificationName !== certificationName) {
            continue;
          }
          
          // Apply timeframe filter
          const sessionDate = new Date(session.createdAt);
          const now = new Date();
          const daysDiff = (now - sessionDate) / (1000 * 60 * 60 * 24);
          
          switch (timeframe) {
            case "week":
              if (daysDiff > 7) continue;
              break;
            case "month":
              if (daysDiff > 30) continue;
              break;
            case "quarter":
              if (daysDiff > 90) continue;
              break;
          }
          
          sessions.push(session);
        }
      }
      
      return sessions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      return []; // No sessions found
    }
  }
  
  async ensureDirectoryExists(dirPath) {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }
  }
  
  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Quiz Engine MCP Server running on stdio");
  }
}

const server = new QuizEngineMCP();
server.run().catch(console.error);