// SFMC Email Specialist Certification Questions
// Lesson 5: Journey Builder & Automation (Exercises 6-1 through 6-11)
// 20-25% of certification exam content

const lesson5Questions = [
    {
        question: "NTO wants to create a complex customer onboarding journey that adapts based on customer behavior and preferences collected during signup. What Journey Builder architecture ensures optimal customer experience and operational efficiency?",
        options: [
            "Create a single linear journey for all new customers",
            "Design modular journey architecture with decision splits based on customer attributes, behavioral triggers, and preference-driven paths that enable personalized onboarding experiences",
            "Use separate journeys for each customer segment without connection",
            "Rely on batch email campaigns instead of Journey Builder"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Optimal onboarding requires modular architecture with decision splits evaluating customer attributes (industry, role, company size), behavioral triggers (email engagement, website activity), and preference-driven paths (content interests, communication frequency) to deliver personalized experiences that increase activation and retention."
    },

    {
        question: "For NTO's abandoned cart recovery journey, they need to implement sophisticated logic that considers cart value, product category, customer tier, and previous purchase behavior. What Journey Builder configuration maximizes recovery rates?",
        options: [
            "Send the same recovery email to all customers who abandon carts",
            "Implement multi-criteria decision logic with cart value thresholds, product category-specific messaging, customer tier recognition, and purchase history analysis for personalized recovery sequences",
            "Wait 24 hours then send a single discount email",
            "Use external systems for cart abandonment instead of Journey Builder"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Effective cart recovery requires multi-criteria decision logic: cart value thresholds determine urgency and incentive levels, product category-specific messaging increases relevance, customer tier recognition provides appropriate treatment, and purchase history analysis informs timing and approach for maximum recovery probability."
    },

    {
        question: "NTO needs to create a customer lifecycle journey that automatically moves customers between lifecycle stages (prospect → customer → advocate) based on behavioral data and engagement metrics. What automation approach ensures accurate progression tracking?",
        options: [
            "Manually update customer lifecycle stages monthly",
            "Configure automated lifecycle progression using engagement scoring, purchase behavior triggers, advocacy indicators, and data-driven decision splits with proper attribution and timing controls",
            "Use only purchase data to determine lifecycle stages",
            "Create separate journeys for each lifecycle stage without progression"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Automated lifecycle progression requires engagement scoring systems, purchase behavior triggers for customer conversion, advocacy indicators (referrals, reviews, social sharing), and data-driven decision splits with proper attribution models and timing controls to ensure accurate stage transitions and appropriate messaging."
    },

    {
        question: "When building NTO's re-engagement journey for dormant customers, what criteria and sequence design provides the highest probability of reactivation while managing list hygiene?",
        options: [
            "Send weekly emails until customers engage or unsubscribe",
            "Implement escalating re-engagement sequence with engagement time-based criteria, value proposition variations, channel diversification, and systematic suppression for non-responders to maintain deliverability",
            "Remove all dormant customers immediately to improve metrics",
            "Send the same re-engagement email monthly"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Effective re-engagement requires escalating sequences with time-based engagement criteria, varying value propositions (discounts, content, exclusives), channel diversification (email, SMS, direct mail), and systematic suppression of non-responders to maintain deliverability and sender reputation while maximizing reactivation opportunity."
    },

    {
        question: "NTO wants to create a journey that triggers based on website behavior, email engagement, and purchase activity across multiple touchpoints. What data integration and entry criteria configuration ensures reliable journey triggering?",
        options: [
            "Use only email-based entry criteria to simplify tracking",
            "Configure multi-source data integration with real-time API connections, comprehensive entry event evaluation, data validation rules, and fallback mechanisms for data availability issues",
            "Trigger journeys manually based on weekly data reviews",
            "Use separate journeys for each data source"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Multi-touchpoint journey triggering requires real-time API integration across data sources (website, email, purchase systems), comprehensive entry event evaluation combining multiple criteria, data validation rules ensuring quality, and fallback mechanisms handling data availability issues while maintaining journey functionality."
    },

    {
        question: "For NTO's VIP customer journey that provides exclusive experiences and personalized attention, what Journey Builder features ensure appropriate treatment and tracking of high-value customers?",
        options: [
            "Use the same journey structure as regular customers with different email content",
            "Design premium journey architecture with priority routing, enhanced personalization capabilities, dedicated support integration, escalation paths, and comprehensive VIP interaction tracking",
            "Send VIP communications manually for better control",
            "Create simple email sequences without automation"
        ],
        correct: 1,
        explanation: "Correct Answer: B. VIP customer journeys require premium architecture with priority routing for faster processing, enhanced personalization using comprehensive customer data, integration with dedicated support systems, escalation paths for issues, and detailed interaction tracking to ensure exceptional customer experience and relationship management."
    },

    {
        question: "NTO needs to implement cross-channel customer journeys that coordinate email, SMS, push notifications, and direct mail. What Journey Builder configuration ensures consistent messaging and optimal channel orchestration?",
        options: [
            "Use only email channels to maintain simplicity",
            "Configure unified cross-channel journey architecture with channel preference logic, message consistency controls, timing optimization across channels, and comprehensive engagement tracking",
            "Create separate journeys for each communication channel",
            "Let customers choose their preferred channel and use only that"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Cross-channel orchestration requires unified journey architecture respecting customer channel preferences, message consistency controls ensuring cohesive experience, timing optimization preventing channel conflicts, and comprehensive engagement tracking measuring effectiveness across all touchpoints for optimal customer experience."
    },

    {
        question: "When designing NTO's seasonal campaign journeys that must adapt to different promotional periods and inventory levels, what automation strategy provides flexibility while maintaining campaign effectiveness?",
        options: [
            "Create fixed journeys that don't change during campaign periods",
            "Implement dynamic journey architecture with date-based decision logic, inventory-aware routing, promotional period adaptations, and real-time content updates based on business conditions",
            "Use manual campaign management during seasonal periods",
            "Stop all automated journeys during promotional periods"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Seasonal campaign automation requires dynamic architecture with date-based decision logic for promotional periods, inventory-aware routing preventing out-of-stock promotions, promotional period adaptations adjusting messaging and offers, and real-time content updates responding to business conditions and campaign performance."
    },

    {
        question: "NTO wants to measure the effectiveness of their Journey Builder campaigns beyond email metrics to understand business impact. What analytics configuration provides comprehensive journey performance insights?",
        options: [
            "Track only journey-specific email opens and clicks",
            "Implement comprehensive journey analytics with conversion attribution, revenue tracking, customer lifetime value impact, path analysis, and cross-journey performance comparison",
            "Use manual reporting to track business results",
            "Focus only on journey completion rates"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Comprehensive journey analytics require conversion attribution across touchpoints, revenue tracking linking journey engagement to business outcomes, customer lifetime value impact measurement, path analysis identifying optimal routes, and cross-journey performance comparison for continuous optimization and ROI demonstration."
    },

    {
        question: "For NTO's customer service recovery journey triggered by support interactions, what integration and automation approach ensures timely, appropriate follow-up while avoiding communication conflicts?",
        options: [
            "Send automated follow-ups without considering support ticket status",
            "Integrate Customer Service systems with Journey Builder using real-time data synchronization, ticket status-based routing, escalation prevention logic, and support team notification systems",
            "Handle all service recovery manually without automation",
            "Use separate systems for service recovery without Marketing Cloud integration"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Service recovery automation requires Customer Service system integration with real-time ticket status synchronization, routing logic based on resolution status, escalation prevention avoiding duplicate communications, and support team notifications ensuring coordinated customer experience and issue resolution."
    },

    {
        question: "NTO needs to create journey templates that can be replicated across different product lines and markets while maintaining consistent logic but allowing customization. What Journey Builder approach ensures scalability and consistency?",
        options: [
            "Create completely unique journeys for each product and market",
            "Develop modular journey templates with configurable parameters, standardized decision logic, customizable content areas, and deployment guidelines that enable consistent scaling across business units",
            "Use only basic journey structures without customization options",
            "Copy journeys manually for each new implementation"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Scalable journey architecture requires modular templates with configurable parameters for market differences, standardized decision logic ensuring consistency, customizable content areas for localization, and deployment guidelines enabling business units to implement proven journey structures with appropriate customization."
    },

    {
        question: "When implementing NTO's lead nurturing journey for B2B prospects with long sales cycles, what timing and content strategy optimizes conversion while avoiding customer fatigue?",
        options: [
            "Send weekly emails with the same content until prospects convert",
            "Design progressive nurturing sequence with engagement-based timing, educational content progression, sales-readiness scoring, and adaptive frequency based on prospect behavior and profile data",
            "Wait for prospects to request information before sending additional content",
            "Send daily emails to maintain top-of-mind awareness"
        ],
        correct: 1,
        explanation: "Correct Answer: B. B2B lead nurturing requires progressive sequences with engagement-based timing adapting to prospect responses, educational content progression building trust and expertise, sales-readiness scoring identifying conversion opportunities, and adaptive frequency preventing fatigue while maintaining engagement throughout long sales cycles."
    },

    {
        question: "NTO wants to implement journey optimization through systematic A/B testing of journey paths, timing, and content. What testing strategy provides reliable insights for journey improvement?",
        options: [
            "Test only email subject lines within journeys",
            "Implement comprehensive journey testing with path variations, timing experiments, content alternatives, statistical significance validation, and systematic winner implementation across journey portfolio",
            "Avoid testing in journeys to maintain consistency",
            "Test journey elements manually without systematic measurement"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Journey optimization requires systematic testing of path variations (different decision criteria), timing experiments (wait duration, send times), content alternatives (messaging approaches), statistical significance validation ensuring reliable results, and systematic winner implementation scaling successful improvements across the journey portfolio."
    },

    {
        question: "For NTO's compliance requirements in regulated industries, what Journey Builder configuration ensures proper consent management and regulatory adherence throughout automated customer communications?",
        options: [
            "Assume consent for all customers in automated journeys",
            "Implement consent-aware journey architecture with regulatory compliance checkpoints, consent validation at each touchpoint, opt-out processing, and audit trail maintenance for regulatory reporting",
            "Handle compliance manually outside of Journey Builder",
            "Use generic compliance approaches without industry-specific considerations"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Regulatory compliance requires consent-aware architecture with compliance checkpoints validating customer consent status, touchpoint consent validation ensuring appropriate communications, automated opt-out processing, and comprehensive audit trails supporting regulatory reporting and demonstrating compliance adherence."
    },

    {
        question: "NTO needs to create journey error handling and recovery procedures for scenarios like data source failures, external system downtime, or API connectivity issues. What architecture ensures journey reliability and customer experience continuity?",
        options: [
            "Stop journeys when errors occur and restart them manually",
            "Design resilient journey architecture with error detection mechanisms, fallback procedures, alternative path routing, retry logic, and customer communication continuity during system issues",
            "Ignore errors and continue with incomplete data",
            "Use external monitoring without built-in journey resilience"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Journey resilience requires error detection mechanisms identifying system issues, fallback procedures maintaining functionality, alternative path routing when primary routes fail, retry logic for temporary issues, and communication continuity ensuring customers receive appropriate messaging even during system disruptions."
    }
];