/**
 * Progress Tracker - Manages user learning progress and analytics
 * Handles local storage, performance metrics, and study recommendations
 */

class ProgressTracker {
    constructor() {
        this.storageKey = 'sfmc_study_progress';
        this.data = this.loadProgress();
        this.topics = [
            'Contact Builder & Data Management',
            'Data Extensions & Import',
            'Data Models & Relationships',
            'Email Studio & Content',
            'Journey Builder & Automation',
            'Analytics & Reporting',
            'Advanced Features & Best Practices'
        ];
        this.init();
    }

    init() {
        this.ensureDataStructure();
        this.updateLastActivity();
        console.log('Progress Tracker initialized');
    }

    ensureDataStructure() {
        const defaultData = {
            totalQuestions: 0,
            correctAnswers: 0,
            studySessions: 0,
            totalStudyTime: 0,
            lastActivity: new Date().toISOString(),
            dailyStreak: 0,
            lastStudyDate: null,
            topicProgress: {},
            weeklyGoals: {
                questionsTarget: 50,
                accuracyTarget: 85,
                studyTimeTarget: 300 // minutes
            },
            achievements: [],
            answerHistory: [],
            weakTopics: [],
            strongTopics: []
        };

        // Initialize topic progress for all topics
        this.topics.forEach(topic => {
            if (!this.data.topicProgress) this.data.topicProgress = {};
            if (!this.data.topicProgress[topic]) {
                this.data.topicProgress[topic] = {
                    questionsAnswered: 0,
                    correctAnswers: 0,
                    accuracy: 0,
                    lastStudied: null,
                    masteryLevel: 0 // 0-100
                };
            }
        });

        // Merge with existing data
        Object.keys(defaultData).forEach(key => {
            if (this.data[key] === undefined) {
                this.data[key] = defaultData[key];
            }
        });

        this.saveProgress();
    }

    loadProgress() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error('Error loading progress:', error);
            return {};
        }
    }

    saveProgress() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }

    recordAnswer(answer) {
        // Update global stats
        this.data.totalQuestions++;
        if (answer.isCorrect) {
            this.data.correctAnswers++;
        }

        // Update topic-specific progress
        const topic = answer.topic;
        if (this.data.topicProgress[topic]) {
            const topicData = this.data.topicProgress[topic];
            topicData.questionsAnswered++;
            if (answer.isCorrect) {
                topicData.correctAnswers++;
            }
            topicData.accuracy = Math.round((topicData.correctAnswers / topicData.questionsAnswered) * 100);
            topicData.lastStudied = new Date().toISOString();

            // Update mastery level (simplified algorithm)
            topicData.masteryLevel = Math.min(100, Math.round(
                (topicData.accuracy * 0.7) +
                (Math.min(topicData.questionsAnswered, 20) * 1.5)
            ));
        }

        // Add to answer history (keep last 100 answers)
        this.data.answerHistory.unshift(answer);
        if (this.data.answerHistory.length > 100) {
            this.data.answerHistory = this.data.answerHistory.slice(0, 100);
        }

        // Update weak/strong topics
        this.updateTopicClassification();

        // Check for achievements
        this.checkAchievements();

        // Update activity tracking
        this.updateLastActivity();
        this.updateStudyStreak();

        this.saveProgress();
    }

    recordStudySession(durationMinutes) {
        this.data.studySessions++;
        this.data.totalStudyTime += durationMinutes;
        this.updateLastActivity();
        this.updateStudyStreak();
        this.saveProgress();
    }

    updateTopicClassification() {
        this.data.weakTopics = [];
        this.data.strongTopics = [];

        Object.entries(this.data.topicProgress).forEach(([topic, progress]) => {
            if (progress.questionsAnswered >= 3) { // Minimum questions for classification
                if (progress.accuracy < 70) {
                    this.data.weakTopics.push(topic);
                } else if (progress.accuracy >= 85) {
                    this.data.strongTopics.push(topic);
                }
            }
        });
    }

    updateStudyStreak() {
        const today = new Date().toDateString();
        const lastStudy = this.data.lastStudyDate;

        if (lastStudy) {
            const lastStudyDate = new Date(lastStudy).toDateString();
            const yesterday = new Date(Date.now() - 86400000).toDateString();

            if (lastStudyDate === today) {
                // Already studied today, no change to streak
                return;
            } else if (lastStudyDate === yesterday) {
                // Studied yesterday, increment streak
                this.data.dailyStreak++;
            } else {
                // Missed a day, reset streak
                this.data.dailyStreak = 1;
            }
        } else {
            // First study session
            this.data.dailyStreak = 1;
        }

        this.data.lastStudyDate = today;
    }

    updateLastActivity() {
        this.data.lastActivity = new Date().toISOString();
    }

    checkAchievements() {
        const newAchievements = [];

        // Accuracy achievements
        const overallAccuracy = this.getOverallAccuracy();
        if (overallAccuracy >= 90 && !this.hasAchievement('expert_accuracy')) {
            newAchievements.push({
                id: 'expert_accuracy',
                name: 'Expert Level',
                description: 'Achieved 90%+ overall accuracy',
                icon: 'fas fa-star',
                date: new Date().toISOString()
            });
        }

        // Question milestones
        if (this.data.totalQuestions >= 100 && !this.hasAchievement('century_club')) {
            newAchievements.push({
                id: 'century_club',
                name: 'Century Club',
                description: 'Answered 100+ questions',
                icon: 'fas fa-trophy',
                date: new Date().toISOString()
            });
        }

        // Study streak achievements
        if (this.data.dailyStreak >= 7 && !this.hasAchievement('week_warrior')) {
            newAchievements.push({
                id: 'week_warrior',
                name: 'Week Warrior',
                description: '7-day study streak',
                icon: 'fas fa-fire',
                date: new Date().toISOString()
            });
        }

        // Topic mastery
        const masteredTopics = Object.values(this.data.topicProgress).filter(
            topic => topic.masteryLevel >= 80
        ).length;
        if (masteredTopics >= 3 && !this.hasAchievement('topic_master')) {
            newAchievements.push({
                id: 'topic_master',
                name: 'Topic Master',
                description: 'Mastered 3+ topic areas',
                icon: 'fas fa-graduation-cap',
                date: new Date().toISOString()
            });
        }

        // Add new achievements
        newAchievements.forEach(achievement => {
            this.data.achievements.push(achievement);
            this.showAchievementNotification(achievement);
        });
    }

    hasAchievement(id) {
        return this.data.achievements.some(achievement => achievement.id === id);
    }

    showAchievementNotification(achievement) {
        // Simple notification for MVP - can be enhanced later
        setTimeout(() => {
            if (confirm(`🎉 Achievement Unlocked: ${achievement.name}\n${achievement.description}\n\nKeep up the great work!`)) {
                // User acknowledged achievement
            }
        }, 1000);
    }

    // Getters for dashboard display
    getOverallAccuracy() {
        return this.data.totalQuestions > 0
            ? Math.round((this.data.correctAnswers / this.data.totalQuestions) * 100)
            : 0;
    }

    getOverallProgress() {
        // Simple progress calculation based on questions answered and accuracy
        const questionProgress = Math.min(100, (this.data.totalQuestions / 200) * 100);
        const accuracyProgress = this.getOverallAccuracy();
        return Math.round((questionProgress * 0.6) + (accuracyProgress * 0.4));
    }

    getTopicProgress() {
        return this.data.topicProgress;
    }

    getWeakTopics() {
        return this.data.weakTopics;
    }

    getStrongTopics() {
        return this.data.strongTopics;
    }

    getStudyStreak() {
        return this.data.dailyStreak;
    }

    getTotalStudyTime() {
        return this.data.totalStudyTime;
    }

    getRecentPerformance(days = 7) {
        const cutoffDate = new Date(Date.now() - (days * 24 * 60 * 60 * 1000));
        return this.data.answerHistory.filter(answer =>
            new Date(answer.timestamp || Date.now()) > cutoffDate
        );
    }

    // AI-powered recommendations
    getPersonalizedRecommendations() {
        const recommendations = [];
        const accuracy = this.getOverallAccuracy();
        const weakTopics = this.getWeakTopics();
        const strongTopics = this.getStrongTopics();

        // Accuracy-based recommendations
        if (accuracy < 70) {
            recommendations.push({
                type: 'focus',
                priority: 'high',
                message: 'Focus on understanding fundamental concepts before attempting more questions.',
                action: 'Review lesson materials for your weak topics'
            });
        } else if (accuracy < 85) {
            recommendations.push({
                type: 'practice',
                priority: 'medium',
                message: 'Good progress! Focus on practicing more questions in your weak areas.',
                action: 'Take focused practice sessions'
            });
        } else {
            recommendations.push({
                type: 'exam',
                priority: 'low',
                message: 'Excellent accuracy! You\'re ready for practice exams.',
                action: 'Take full practice exams to build confidence'
            });
        }

        // Topic-specific recommendations
        if (weakTopics.length > 0) {
            recommendations.push({
                type: 'weak_topics',
                priority: 'high',
                message: `Improve your performance in: ${weakTopics.join(', ')}`,
                action: 'Study lesson materials and practice questions for these topics'
            });
        }

        // Study frequency recommendations
        const daysSinceLastStudy = this.data.lastStudyDate
            ? Math.floor((Date.now() - new Date(this.data.lastStudyDate)) / (1000 * 60 * 60 * 24))
            : 0;

        if (daysSinceLastStudy > 2) {
            recommendations.push({
                type: 'frequency',
                priority: 'medium',
                message: 'Regular practice is key to retention. Try to study daily.',
                action: 'Set a daily study goal of 15-30 minutes'
            });
        }

        return recommendations;
    }

    // Study session recommendations
    getNextStudySession() {
        const weakTopics = this.getWeakTopics();
        const accuracy = this.getOverallAccuracy();

        if (weakTopics.length > 0) {
            return {
                type: 'focused',
                topics: weakTopics.slice(0, 2), // Focus on top 2 weak topics
                duration: 20,
                questionCount: 10
            };
        } else if (accuracy >= 85) {
            return {
                type: 'exam',
                duration: 90,
                questionCount: 60
            };
        } else {
            return {
                type: 'quick',
                duration: 15,
                questionCount: 5
            };
        }
    }

    // Data export for analytics
    exportProgress() {
        return {
            ...this.data,
            exportDate: new Date().toISOString(),
            overallAccuracy: this.getOverallAccuracy(),
            overallProgress: this.getOverallProgress()
        };
    }

    // Reset progress (for testing or fresh start)
    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            localStorage.removeItem(this.storageKey);
            this.data = {};
            this.ensureDataStructure();
            return true;
        }
        return false;
    }
}

// Initialize progress tracker when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.progressTracker = new ProgressTracker();
});