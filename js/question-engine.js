/**
 * SFMC Question Engine - Core functionality for question delivery and assessment
 * Handles question loading, randomization, and adaptive difficulty
 */

class QuestionEngine {
    constructor() {
        this.allQuestions = [];
        this.currentSession = {
            questions: [],
            currentIndex: 0,
            answers: [],
            startTime: null,
            mode: 'quick' // quick, focused, exam
        };
        this.questionSources = [
            'question-banks/advanced/advanced_lesson_1_certification_questions.js',
            'question-banks/advanced/lesson_2_advanced_certification_questions.js',
            'question-banks/advanced/lesson_3_advanced_certification_questions.js',
            'question-banks/advanced/lesson_4_advanced_certification_questions.js',
            'question-banks/advanced/lesson_5_advanced_certification_questions.js',
            'question-banks/advanced/lesson_6_advanced_certification_questions.js',
            'question-banks/advanced/lesson_7_advanced_certification_questions.js',
            'question-banks/intermediate/lesson_5_comprehensive_certification_questions.js'
        ];
        this.topicMapping = {
            'lesson_1': 'Contact Builder & Data Management',
            'lesson_2': 'Data Extensions & Import',
            'lesson_3': 'Data Models & Relationships',
            'lesson_4': 'Email Studio & Content',
            'lesson_5': 'Journey Builder & Automation',
            'lesson_6': 'Analytics & Reporting',
            'lesson_7': 'Advanced Features & Best Practices'
        };
        this.init();
    }

    async init() {
        await this.loadAllQuestions();
        this.setupEventListeners();
    }

    async loadAllQuestions() {
        try {
            this.allQuestions = this.loadRealQuestionBank();
            console.log(`Loaded ${this.allQuestions.length} questions`);
        } catch (error) {
            console.error('Error loading questions:', error);
            this.showError('Failed to load questions. Please refresh the page.');
        }
    }

    // Combines the full 275-question certification bank into one normalized
    // list. Those questions live in question-banks/advanced/*.js and
    // question-banks/intermediate/*.js, loaded as plain global arrays via
    // <script> tags in interactive-study-platform.html (see that file).
    // Falls back to a small built-in sample set if those files aren't
    // present on the page for some reason, so the app never hard-fails.
    loadRealQuestionBank() {
        const sources = [
            { global: 'advancedLesson1Questions', topic: this.topicMapping.lesson_1, difficulty: 'advanced', prefix: 'l1' },
            { global: 'advancedLesson2Questions', topic: this.topicMapping.lesson_2, difficulty: 'advanced', prefix: 'l2' },
            { global: 'lesson3AdvancedQuestions', topic: this.topicMapping.lesson_3, difficulty: 'advanced', prefix: 'l3' },
            { global: 'advancedLesson4Questions', topic: this.topicMapping.lesson_4, difficulty: 'advanced', prefix: 'l4' },
            { global: 'lesson5Questions', topic: this.topicMapping.lesson_5, difficulty: 'advanced', prefix: 'l5a' },
            { global: 'advancedLesson6Questions', topic: this.topicMapping.lesson_6, difficulty: 'advanced', prefix: 'l6' },
            { global: 'lesson7Questions', topic: this.topicMapping.lesson_7, difficulty: 'advanced', prefix: 'l7' },
            { global: 'lesson5ComprehensiveQuestions', topic: this.topicMapping.lesson_5, difficulty: 'intermediate', prefix: 'l5i' }
        ];

        const combined = [];
        sources.forEach(source => {
            const bank = window[source.global];
            if (Array.isArray(bank)) {
                bank.forEach((q, index) => {
                    combined.push({
                        id: q.id || `${source.prefix}-${index + 1}`,
                        topic: q.topic || source.topic,
                        difficulty: q.difficulty || source.difficulty,
                        question: q.question,
                        options: q.options,
                        correct: q.correct,
                        explanation: q.explanation
                    });
                });
            }
        });

        if (combined.length === 0) {
            console.warn('Full question bank files were not found on this page - falling back to the small built-in sample set.');
            return this.getSampleQuestions();
        }

        return combined;
    }

    // Small built-in fallback set, used only if the full question-bank
    // <script> files above aren't present (e.g. this file is loaded on a
    // page that never included them).
    getSampleQuestions() {
        return [
            {
                id: 'cb001',
                topic: 'Contact Builder & Data Management',
                difficulty: 'advanced',
                question: "An enterprise client has customers who interact across multiple touchpoints: e-commerce website, mobile app, retail stores, and customer service. They use different customer IDs in each system (WebID, AppUserID, StoreCustomerID, ServiceTicketID). What is the most critical architectural decision when setting up their Contact Model in SFMC?",
                options: [
                    "Use email address as the universal Contact Key across all systems",
                    "Create separate Contact Models for each touchpoint to maintain data integrity",
                    "Establish a Master Customer ID as the Contact Key with proper channel connections and data relationships",
                    "Use the most frequently updated ID (WebID) as the primary Contact Key"
                ],
                correct: 2,
                explanation: "Option C is correct. A unified Contact Key (Master Customer ID) enables cross-channel customer journey orchestration and unified reporting. This approach allows you to connect all touchpoint data to a single customer identity while maintaining proper data relationships. Using email as Contact Key fails for customers without email or those who change emails. Separate Contact Models prevent unified customer views and cross-channel personalization. Using WebID only excludes in-store and service interactions."
            },
            {
                id: 'cb002',
                topic: 'Contact Builder & Data Management',
                difficulty: 'advanced',
                question: "Your Contact Builder contains 5 million contacts with multiple populations. Journey Builder performance is degrading with timeout issues during audience building. What architectural change would most effectively resolve these performance issues?",
                options: [
                    "Reduce the number of populations by consolidating them into three main categories",
                    "Implement a master 'All Contacts' population with filtered sub-populations and optimized indexing",
                    "Split the Contact Model into separate instances based on customer value tiers",
                    "Remove all population overlap by enforcing mutually exclusive categories"
                ],
                correct: 1,
                explanation: "Option B is correct. A master population with filtered sub-populations and proper indexing provides optimal performance for large contact databases. This approach maintains flexibility while ensuring efficient query execution in Journey Builder. Consolidating populations may lose important segmentation capabilities. Splitting Contact Models breaks unified customer views. Removing overlap eliminates valuable multi-dimensional customer insights."
            },
            {
                id: 'de001',
                topic: 'Data Extensions & Import',
                difficulty: 'advanced',
                question: "Amroha Outfitters needs to import 50GB of transaction data daily from their ERP system. The data includes customer purchases, returns, and loyalty point updates. Which import strategy provides the best performance and reliability?",
                options: [
                    "Use File Transfer Activities with CSV files and scheduled automation",
                    "Implement REST API calls for real-time data synchronization",
                    "Set up FTP import with compressed files and error handling automation",
                    "Use SQL Query Activities to directly connect to the ERP database"
                ],
                correct: 2,
                explanation: "Option C is correct. FTP import with compression and error handling provides the most reliable solution for large daily data imports. This approach handles the 50GB volume efficiently, includes built-in retry mechanisms, and maintains data integrity. CSV file transfers have size limitations. REST API calls are inefficient for bulk data. Direct SQL connections create security risks and performance issues."
            },
            {
                id: 'es001',
                topic: 'Email Studio & Content',
                difficulty: 'intermediate',
                question: "You're creating a promotional email for Amroha Outfitters that needs to display different product recommendations based on customer purchase history. Which AMPscript function combination provides the most efficient solution?",
                options: [
                    "Lookup() and If() statements for conditional content",
                    "LookupRows() with For() loops for multiple product retrieval",
                    "DataExtension.Init() with custom functions",
                    "ContentArea() with dynamic content blocks"
                ],
                correct: 1,
                explanation: "Option B is correct. LookupRows() with For() loops provides the most efficient method for retrieving and displaying multiple related records. This approach can fetch multiple product recommendations in a single operation and iterate through them effectively. Single Lookup() calls are inefficient for multiple items. DataExtension.Init() is not a standard AMPscript function. ContentArea() doesn't provide the dynamic data retrieval needed."
            },
            {
                id: 'jb001',
                topic: 'Journey Builder & Automation',
                difficulty: 'advanced',
                question: "Amroha Outfitters wants to create a journey that responds differently based on customer engagement levels. High-engagement customers should receive immediate offers, while low-engagement customers should enter a re-engagement sequence. What Journey Builder configuration achieves this most effectively?",
                options: [
                    "Use Decision Split with engagement score criteria and separate journey paths",
                    "Create two separate journeys with different entry criteria",
                    "Implement Wait activities with random duration for personalization",
                    "Use Einstein Engagement Scoring with automatic path selection"
                ],
                correct: 0,
                explanation: "Option A is correct. Decision Split with engagement score criteria allows real-time path determination within a single journey, providing immediate routing based on customer behavior. This approach maintains unified reporting and simplified management. Separate journeys create management complexity and reporting fragmentation. Wait activities don't provide personalization logic. Einstein Engagement Scoring requires additional licensing and setup."
            },
            {
                id: 'ar001',
                topic: 'Analytics & Reporting',
                difficulty: 'intermediate',
                question: "Amroha Outfitters needs to track email performance across multiple business units and compare ROI by product category. Which reporting approach provides the most comprehensive insights?",
                options: [
                    "Use Email Studio reports with manual data compilation",
                    "Implement Discover reporting with custom dashboards and automated data feeds",
                    "Export data to Excel for advanced analysis",
                    "Create Journey Builder reports for each business unit"
                ],
                correct: 1,
                explanation: "Option B is correct. Discover reporting with custom dashboards provides comprehensive, automated analytics with the ability to correlate email performance with business metrics like ROI by product category. This approach offers real-time insights and eliminates manual data compilation. Email Studio reports alone lack advanced analytics capabilities. Excel exports are manual and don't provide real-time insights. Journey Builder reports don't cover Email Studio performance metrics."
            },
            {
                id: 'af001',
                topic: 'Advanced Features & Best Practices',
                difficulty: 'advanced',
                question: "Amroha Outfitters is implementing GDPR compliance for their European customers. They need to ensure data deletion requests are processed across all SFMC systems. What is the most comprehensive approach?",
                options: [
                    "Use Contact Builder deletion with manual cleanup of related data",
                    "Implement a coordinated deletion process across Contact Builder, Data Extensions, and Journey Builder with audit trails",
                    "Delete contacts only from active sends and leave historical data",
                    "Use Data Retention policies to automatically remove old data"
                ],
                correct: 1,
                explanation: "Option B is correct. GDPR requires comprehensive data deletion across all systems with proper audit trails. This approach ensures compliance by removing customer data from Contact Builder, all related Data Extensions, and Journey Builder while maintaining deletion records for compliance auditing. Manual cleanup is error-prone and not scalable. Leaving historical data violates GDPR requirements. Data Retention policies alone don't address specific deletion requests."
            },
            {
                id: 'cb003',
                topic: 'Contact Builder & Data Management',
                difficulty: 'intermediate',
                question: "When setting up Contact Builder for Amroha Outfitters, you need to connect customer data from three sources: website (email), mobile app (phone), and in-store (loyalty ID). What's the best approach for the Contact Key strategy?",
                options: [
                    "Use email as the primary Contact Key",
                    "Create a unique Customer ID that links all three touchpoints",
                    "Use separate Contact Keys for each channel",
                    "Rotate between different Contact Keys based on data availability"
                ],
                correct: 1,
                explanation: "Option B is correct. A unique Customer ID allows you to unify data from all touchpoints while maintaining the ability to communicate through different channels. This creates a single customer view essential for effective cross-channel marketing."
            },
            {
                id: 'de002',
                topic: 'Data Extensions & Import',
                difficulty: 'intermediate',
                question: "Amroha Outfitters needs to import customer preference data that updates daily. Some customers may not have preferences set. What's the best Data Extension configuration?",
                options: [
                    "Create a Synchronized Data Extension with Contact Builder",
                    "Use a Standard Data Extension with Email as primary key",
                    "Set up a Random Data Extension for better performance",
                    "Use multiple Data Extensions for different preference types"
                ],
                correct: 0,
                explanation: "Option A is correct. A Synchronized Data Extension automatically maintains the relationship with Contact Builder, ensuring data consistency and enabling seamless use in journeys and emails."
            },
            {
                id: 'es002',
                topic: 'Email Studio & Content',
                difficulty: 'intermediate',
                question: "You're creating a welcome email for Amroha Outfitters that includes personalized product recommendations. The email must work even if recommendation data is unavailable. What's the best content strategy?",
                options: [
                    "Use AMPscript with default content blocks for missing data",
                    "Create multiple email versions for different scenarios",
                    "Use dynamic content with fallback options",
                    "Send a generic email when personalization data is missing"
                ],
                correct: 2,
                explanation: "Option C is correct. Dynamic content with fallback options provides the best user experience by showing personalized content when available and gracefully falling back to relevant default content when data is missing."
            }
        ];
    }

    // Question Selection Logic
    selectQuestions(mode, options = {}) {
        let selectedQuestions = [];

        switch (mode) {
            case 'quick':
                selectedQuestions = this.getQuickPracticeQuestions(5);
                break;
            case 'focused':
                selectedQuestions = this.getFocusedQuestions(options.topics, options.count || 10);
                break;
            case 'exam':
                selectedQuestions = this.getExamQuestions(60);
                break;
            default:
                selectedQuestions = this.getRandomQuestions(5);
        }

        return this.shuffleArray(selectedQuestions);
    }

    getQuickPracticeQuestions(count) {
        // Get questions from user's weak areas (for MVP, use random selection)
        const progressTracker = window.progressTracker;
        let weakTopics = [];

        if (progressTracker) {
            weakTopics = progressTracker.getWeakTopics();
        }

        if (weakTopics.length > 0) {
            const weakQuestions = this.allQuestions.filter(q =>
                weakTopics.includes(q.topic)
            );
            if (weakQuestions.length >= count) {
                return this.shuffleArray(weakQuestions).slice(0, count);
            }
        }

        // Fallback to random selection
        return this.shuffleArray(this.allQuestions).slice(0, count);
    }

    getFocusedQuestions(topics, count) {
        const filteredQuestions = this.allQuestions.filter(q =>
            topics.includes(q.topic)
        );
        return this.shuffleArray(filteredQuestions).slice(0, count);
    }

    getExamQuestions(count) {
        // Distribute questions evenly across every topic actually present in
        // the loaded question bank. (This used to be a hardcoded 5-topic
        // weight table that summed to 100% on its own - which meant 2 of the
        // 7 real lesson topics, including Data Models & Relationships and
        // Advanced Features & Best Practices, were never selected for exam
        // mode at all. Deriving topics from the data means this can't go
        // stale again as the question bank changes.)
        const topics = [...new Set(this.allQuestions.map(q => q.topic))];
        const perTopic = topics.length > 0 ? Math.floor(count / topics.length) : 0;

        let examQuestions = [];
        topics.forEach(topic => {
            const topicQuestions = this.allQuestions.filter(q => q.topic === topic);
            examQuestions.push(...this.shuffleArray(topicQuestions).slice(0, perTopic));
        });

        // Fill remaining slots (from rounding) with random questions
        const remaining = count - examQuestions.length;
        if (remaining > 0) {
            const usedIds = examQuestions.map(q => q.id);
            const remainingQuestions = this.allQuestions.filter(q => !usedIds.includes(q.id));
            examQuestions.push(...this.shuffleArray(remainingQuestions).slice(0, remaining));
        }

        return this.shuffleArray(examQuestions);
    }

    getRandomQuestions(count) {
        return this.shuffleArray(this.allQuestions).slice(0, count);
    }

    // Session Management
    startSession(mode, options = {}) {
        this.currentSession = {
            questions: this.selectQuestions(mode, options),
            currentIndex: 0,
            answers: [],
            startTime: new Date(),
            mode: mode,
            options: options
        };

        return this.currentSession;
    }

    getCurrentQuestion() {
        if (this.currentSession.currentIndex >= this.currentSession.questions.length) {
            return null;
        }
        return this.currentSession.questions[this.currentSession.currentIndex];
    }

    submitAnswer(selectedOption, timeSpent = 0) {
        const currentQuestion = this.getCurrentQuestion();
        if (!currentQuestion) return null;

        const isCorrect = selectedOption === currentQuestion.correct;
        const answer = {
            questionId: currentQuestion.id,
            selectedOption: selectedOption,
            correctOption: currentQuestion.correct,
            isCorrect: isCorrect,
            timeSpent: timeSpent,
            topic: currentQuestion.topic,
            difficulty: currentQuestion.difficulty,
            timestamp: new Date().toISOString()
        };

        this.currentSession.answers.push(answer);

        // Update progress tracker
        if (window.progressTracker) {
            window.progressTracker.recordAnswer(answer);
        }

        return answer;
    }

    nextQuestion() {
        this.currentSession.currentIndex++;
        return this.getCurrentQuestion();
    }

    previousQuestion() {
        if (this.currentSession.currentIndex > 0) {
            this.currentSession.currentIndex--;
        }
        return this.getCurrentQuestion();
    }

    skipQuestion() {
        const currentQuestion = this.getCurrentQuestion();
        const answer = {
            questionId: currentQuestion.id,
            selectedOption: -1,
            correctOption: currentQuestion.correct,
            isCorrect: false,
            timeSpent: 0,
            topic: currentQuestion.topic,
            difficulty: currentQuestion.difficulty,
            timestamp: new Date().toISOString(),
            skipped: true
        };

        this.currentSession.answers.push(answer);

        // Keep long-term progress in sync with session stats - previously
        // skipped questions were counted against accuracy in the session
        // summary but never reported to the progress tracker, so a user's
        // saved weak-topic/accuracy stats silently disagreed with what the
        // session results screen showed them.
        if (window.progressTracker) {
            window.progressTracker.recordAnswer(answer);
        }

        this.nextQuestion();
        return this.getCurrentQuestion();
    }

    getSessionResults() {
        const answers = this.currentSession.answers;
        const totalQuestions = answers.length;
        const correctAnswers = answers.filter(a => a.isCorrect).length;
        const skippedQuestions = answers.filter(a => a.skipped).length;
        const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
        const totalTime = new Date() - this.currentSession.startTime;

        // Topic breakdown
        const topicBreakdown = {};
        answers.forEach(answer => {
            if (!topicBreakdown[answer.topic]) {
                topicBreakdown[answer.topic] = { correct: 0, total: 0 };
            }
            topicBreakdown[answer.topic].total++;
            if (answer.isCorrect) {
                topicBreakdown[answer.topic].correct++;
            }
        });

        return {
            totalQuestions,
            correctAnswers,
            skippedQuestions,
            accuracy,
            totalTime,
            topicBreakdown,
            answers
        };
    }

    // Utility Functions
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    setupEventListeners() {
        // Event listeners will be set up by the main app
        console.log('Question Engine initialized');
    }

    showError(message) {
        // Simple error display for MVP
        alert(message);
    }
}

// Initialize question engine when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.questionEngine = new QuestionEngine();
});