/**
 * SFMC Email Specialist Certification - Advanced Questions  
 * Lesson 2: Contact Builder & Data Management (26-29% of Exam)
 * 
 * These questions are designed to match the difficulty and style of the actual
 * SFMC Email Specialist certification exam, focusing on Contact Builder,
 * data management, and complex data architecture scenarios.
 */

const advancedLesson2Questions = [
    // Contact Keys Fundamentals (Questions 1-6)
    {
        id: 1,
        topic: "Contact Keys Fundamentals",
        question: "Northern Trail Outfitters operates across multiple channels: e-commerce (WebCustomerID), retail stores (StoreCustomerID), mobile app (AppUserID), and customer service (ServiceID). They want to create a unified customer view in Contact Builder while maintaining the ability to track channel-specific behavior. What Contact Key strategy would best support both unified identity and channel attribution?",
        options: [
            "Use email address as Contact Key with separate Data Extensions for each channel",
            "Create a Master Customer ID as Contact Key with channel-specific attribute groups and proper data relationships",
            "Use the most frequently updated ID (WebCustomerID) as the primary Contact Key",
            "Implement separate Contact Models for each channel with cross-reference mappings"
        ],
        correct: 1,
        explanation: "Correct Answer: B. A Master Customer ID as the Contact Key enables unified customer identity while channel-specific attribute groups maintain channel attribution and behavior tracking. This approach supports cross-channel journey orchestration and unified reporting while preserving channel-specific insights. Email addresses (A) can change and aren't always available. Most frequent ID (C) excludes other channel interactions. Separate Contact Models (D) prevent unified customer views needed for cross-channel experiences."
    },

    {
        id: 2,
        topic: "Contact Keys Fundamentals",
        question: "NTO's Contact Builder contains 3.5 million contacts with complex population overlap: 1.8M Customers, 900K Prospects, 650K Mobile Users, 400K Loyalty Members, and 150K VIP customers. Journey Builder performance is degrading with timeout errors during audience building. What architectural optimization would most effectively resolve performance issues while maintaining segmentation capabilities?",
        options: [
            "Reduce populations by consolidating similar segments",
            "Implement a master 'All Contacts' population with filtered sub-populations and strategic indexing",
            "Split Contact Model into high-value and standard customer instances",
            "Remove population overlaps by creating mutually exclusive categories"
        ],
        correct: 1,
        explanation: "Correct Answer: B. A master population with filtered sub-populations reduces database fragmentation and query complexity while maintaining segmentation flexibility. Strategic indexing on frequently queried fields improves performance significantly. Consolidation (A) loses valuable targeting precision. Splitting instances (C) prevents unified customer journeys. Removing overlaps (D) artificially constrains natural customer progression and reduces personalization opportunities."
    },

    {
        id: 3,
        topic: "Contact Keys Fundamentals",
        question: "A multinational B2B company needs to track individual contacts and their associated companies in SFMC. Individual contacts change companies, companies have multiple contacts, and they need personalization using both personal data (name, title, preferences) and company data (industry, size, recent contracts). How should you structure the Contact Builder data model?",
        options: [
            "Use company ID as Contact Key with individual data as attributes",
            "Use individual email as Contact Key with company information in related attribute groups",
            "Create separate Contact Models for individuals and companies with synchronized extensions",
            "Implement composite Contact Key combining person ID and company ID"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Individual email as Contact Key with company information in attribute groups supports person-centric messaging while enabling company-level personalization. This structure accommodates company changes through attribute updates and maintains individual engagement tracking. Company ID as Contact Key (A) prevents individual-level personalization. Separate Contact Models (C) complicate journey building and reporting. Composite keys (D) create complexity and prevent easy contact mobility."
    },

    {
        id: 4,
        topic: "Contact Keys Fundamentals",
        question: "NTO implements Einstein Engagement Frequency across 2.8 million global subscribers. They have data residency requirements for European customers under GDPR. What architectural consideration is most critical for Contact Builder configuration?",
        options: [
            "Einstein features require US-based data processing regardless of customer location",
            "Data residency compliance takes precedence; Einstein features must be geographically restricted as needed",
            "Einstein Engagement Frequency operates independently of data location requirements",
            "European customers require separate Marketing Cloud instances for Einstein compliance"
        ],
        correct: 1,
        explanation: "Correct Answer: B. GDPR and data residency regulations are legally mandatory and supersede feature preferences. Einstein features may need geographic limitations or alternative solutions for European customers to maintain compliance. Implementation must balance AI capabilities with legal requirements. Option A incorrectly states Einstein requirements. Option C ignores critical compliance needs. Option D may not solve residency requirements and adds unnecessary complexity."
    },

    {
        id: 5,
        topic: "Contact Keys Fundamentals",
        question: "A retail client's Contact Builder shows declining data quality: 28% incomplete demographic data, 35% outdated preferences, 22% invalid email addresses. Email engagement dropped 18% over 8 months. What systematic approach would most effectively improve data quality and restore engagement?",
        options: [
            "Delete contacts with incomplete data to improve quality metrics",
            "Increase email frequency to re-engage contacts with outdated information",
            "Implement progressive profiling with preference centers and validation rules",
            "Focus only on email address validation for immediate deliverability improvement"
        ],
        correct: 2,
        explanation: "Correct Answer: C. Progressive profiling collects missing data gradually through strategic touchpoints without overwhelming customers. Preference centers give customers control while improving data accuracy. Validation rules prevent future quality degradation. This comprehensive approach addresses root causes while improving engagement. Deleting contacts (A) loses potential revenue. Increased frequency (B) with poor data likely worsens engagement. Email-only focus (D) ignores broader personalization and targeting issues."
    },

    {
        id: 6,
        topic: "Contact Keys Fundamentals",
        question: "Your client synchronizes Contact Builder data with three external systems: Salesforce CRM (real-time sync needed), e-commerce platform (15-minute batch updates), and customer service (daily sync). How should you architect data synchronization to optimize performance while maintaining consistency?",
        options: [
            "Synchronize all systems in real-time for perfect consistency",
            "Use Data Stream for high-frequency updates, scheduled imports for daily updates, matching each system's optimal sync pattern",
            "Implement SFMC as central hub with all systems syncing through Marketing Cloud",
            "Create separate Data Extensions for each system with manual reconciliation"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Matching sync frequency to business needs and system capabilities optimizes performance: Data Stream for real-time CRM updates, API integration for e-commerce batches, scheduled imports for daily service updates. This hybrid approach balances performance with data freshness requirements. Universal real-time (A) creates unnecessary overhead. Hub model (C) may create bottlenecks. Separate extensions (D) cause data inconsistency and manual complexity."
    },

    {
        id: 7,
        topic: "Contact Builder Populations vs Data Extensions",
        question: "A global company has 450K EMEA contacts, 280K APAC contacts, and 1.1M Americas contacts. They must comply with GDPR, PIPEDA, and CCPA while maintaining unified global campaigns. The Contact Builder needs region-specific consent management and data retention. What architecture balances compliance with operational efficiency?",
        options: [
            "Create separate Marketing Cloud instances for each region",
            "Use single global Contact Builder with region-specific attribute groups",
            "Implement master Contact Builder with regional data extensions and compliance workflows",
            "Use geographic populations with automated compliance rules"
        ],
        correct: 2,
        explanation: "Correct Answer: C. Master Contact Builder with regional data extensions enables global campaign coordination while supporting region-specific compliance workflows. This approach provides unified customer views for global customers while maintaining compliant data handling for each jurisdiction. Separate instances (A) prevent global views and increase complexity. Single global structure (B) may not adequately address varying compliance requirements. Geographic populations alone (D) lack sufficient compliance control mechanisms."
    },

    {
        id: 8,
        topic: "Contact Builder Populations vs Data Extensions",
        question: "NTO needs real-time cross-channel identity resolution for customers interacting via web, mobile app, email, and in-store visits. They want to trigger immediate personalized responses across channels when customer behavior indicates purchase intent. What Contact Builder configuration would best support real-time identity resolution and cross-channel activation?",
        options: [
            "Use separate Contact Keys for each channel with periodic matching",
            "Implement unified Contact Key with Data Stream integration and real-time data processing",
            "Create channel-specific populations with scheduled identity resolution",
            "Use external identity resolution service with hourly Contact Builder updates"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Unified Contact Key with Data Stream integration enables real-time customer behavior ingestion and immediate cross-channel activation. This architecture supports instant identity resolution and personalized responses across all touchpoints. Separate Contact Keys (A) prevent real-time unification. Scheduled resolution (C) doesn't meet real-time requirements. External services (D) introduce latency that defeats real-time activation needs."
    },

    // Contact Builder Populations vs Data Extensions (Questions 7-12)
    {
        id: 9,
        topic: "Contact Builder Populations vs Data Extensions",
        question: "An e-commerce client tracks customer purchase behavior with requirements: multiple purchases per customer, multiple products per purchase, product-level returns tracking, and customer lifetime value calculations. They process 12,000 orders daily with 4.2 products per order average. What Data Extension architecture would best support these analytical requirements?",
        options: [
            "Single 'CustomerPurchases' Data Extension with concatenated product information",
            "Normalized structure: Customers, Orders, OrderItems, and Returns with proper relationships",
            "Separate Data Extensions for each product category",
            "Two extensions: CustomerSummary and TransactionDetails with denormalized data"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Normalized structure with proper relationships (CustomerID links to Orders, OrderID links to OrderItems, etc.) supports complex analytics like LTV calculations, product-level analysis, and sophisticated segmentation. This approach scales efficiently with high transaction volumes. Concatenated products (A) prevent detailed analysis. Category separation (C) complicates cross-category insights. Denormalized approach (D) creates update complexity and data redundancy."
    },

    {
        id: 10,
        topic: "Contact Builder Populations vs Data Extensions",
        question: "A subscription service has 2.2 million subscribers in a Data Extension with SubscriberID primary key. They frequently query by EmailAddress, SubscriptionTier, and LastActivityDate, causing timeout errors during audience building. The extension has 52 fields but campaigns use only 9-14 fields. What optimization provides maximum performance improvement?",
        options: [
            "Create indexes on EmailAddress, SubscriptionTier, and LastActivityDate",
            "Split Data Extension into multiple smaller extensions by SubscriptionTier",
            "Create campaign-focused Data Extension with essential fields and strategic indexing",
            "Archive subscribers inactive for 18+ months to reduce record count"
        ],
        correct: 2,
        explanation: "Correct Answer: C. Creating a focused Data Extension with only campaign-relevant fields (9-14 vs 52) dramatically improves query performance and memory usage. Combined with strategic indexing, this provides maximum optimization. While indexing helps (A), excessive field counts still impact performance. Tier-based splitting (B) may help but doesn't address fundamental structure issues. Archiving (D) reduces size but doesn't optimize structure for active campaigns."
    },

    {
        id: 11,
        topic: "Contact Builder Populations vs Data Extensions",
        question: "Your client receives daily CRM imports (175K records) and real-time website activity (60K-80K events daily). They need segments combining both sources for triggered campaigns within 30 minutes of activity. What Data Extension strategy best supports real-time segmentation with mixed data sources?",
        options: [
            "Use Synchronized Data Extensions for CRM data and standard extensions for web activity",
            "Implement Data Stream for website activity, scheduled imports for CRM data, with filtered extensions for real-time segmentation",
            "Create single combined Data Extension with hourly refresh cycles",
            "Use separate extensions with manual audience building for campaigns"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Data Stream handles high-volume real-time website activity efficiently while scheduled imports work well for daily CRM updates. Filtered Data Extensions automatically combine both sources for segmentation within required timeframes. This hybrid approach optimizes each data type for its characteristics. Synchronized extensions (A) don't optimize for web activity. Combined extension (C) creates processing bottlenecks. Manual building (D) defeats real-time segmentation goals."
    },

    {
        id: 12,
        topic: "Contact Builder Populations vs Data Extensions",
        question: "A B2B client has complex entity relationships: Companies, Contacts, Opportunities, and Activities. They send to Contacts but personalize using Company data and recent Opportunity activity. Contacts may have multiple Opportunities, Companies have multiple Contacts. How should you structure Data Extensions for optimal send performance with rich personalization?",
        options: [
            "Create single sendable Data Extension with all information denormalized",
            "Use separate Data Extensions with SQL Query Activities to build sendable audiences",
            "Create master sendable extension with AMPscript lookups to related data",
            "Implement Data Extension relationships with automated joins for real-time personalization"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Separate normalized Data Extensions preserve data integrity and efficient updates, while SQL Query Activities create optimized sendable audiences by joining data specifically for campaigns. This balances data structure integrity with send performance. Single denormalized extension (A) creates update complexity. AMPscript lookups (C) can impact send performance with large volumes. Automated joins (D) may cause performance issues during high-volume sends."
    },

    {
        id: 13,
        topic: "Cross-channel Data Tracking",
        question: "NTO's transaction Data Extension has grown to 4.8 million records with 18-month data retention policy. Performance issues require archiving implementation. The extension contains TransactionDate, CustomerID, Amount, and ProductCategory fields needed for compliance and analytics. What archiving strategy maintains performance while preserving accessibility?",
        options: [
            "Archive all records older than 6 months for immediate performance improvement",
            "Implement tiered archiving: 12+ months to archive, 18+ months to cold storage, with indexed access",
            "Keep only most recent transaction per customer, archive everything else",
            "Archive based on transaction amount, keeping high-value transactions active"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Tiered archiving balances performance (keeping 12 months active), compliance (18-month retention), and analytics needs (indexed archive access). This approach maintains recent data for campaigns while preserving historical data for analysis and compliance. Six-month archiving (A) may not provide sufficient active data. Recent-only approach (C) loses valuable customer history. Amount-based archiving (D) creates inconsistent patterns and may violate retention policies."
    },

    {
        id: 14,
        topic: "Cross-channel Data Tracking",
        question: "A retailer needs abandoned cart recovery Data Extensions supporting: multiple carts per customer, multiple products per cart, cart creation/update timestamps, and abandonment duration tracking. They must exclude customers who completed purchases after abandonment. What structure best supports these requirements?",
        options: [
            "Single Data Extension with CartID primary key and concatenated product list",
            "Related extensions: AbandonedCarts, CartProducts, with filtered extension for sendable audience",
            "Separate Data Extensions for each product category",
            "Master customer extension with cart information as additional fields"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Related AbandonedCarts and CartProducts extensions enable detailed product analysis while maintaining relational integrity. Filtered Data Extension automatically excludes post-abandonment purchasers, ensuring campaign accuracy. This structure supports sophisticated cart-based personalization. Concatenated products (A) limit analysis capabilities. Category separation (C) complicates cross-category cart analysis. Customer master addition (D) creates redundancy and update complexity."
    },

    {
        id: 15,
        topic: "Cross-channel Data Tracking",
        question: "An enterprise client requires strict data validation: email addresses must match corporate patterns, postal codes must align with regions, phone numbers need international formatting. They import from multiple sources with varying quality. What validation strategy maintains quality while minimizing import failures?",
        options: [
            "Implement strict validation rules rejecting any non-compliant records",
            "Use data transformation rules during import with error handling and notification workflows",
            "Accept all data during import and clean afterward with automated processes",
            "Create source-specific import processes with individualized validation rules"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Data transformation rules standardize and validate data during import while error handling captures issues for review without stopping imports. Notification workflows alert administrators to quality issues. This maximizes successful imports while maintaining standards. Strict rejection (A) may lose valuable data over minor formatting. Post-import cleaning (C) allows poor data into campaigns. Source-specific processes (D) create management complexity without addressing fundamental validation needs."
    },

    {
        id: 16,
        topic: "Cross-channel Data Tracking",
        question: "A subscription service imports customer data with variable structures: some imports include preferences, others billing information, some both. They need flexible processing handling different structures without import failures. What approach best accommodates variable data requirements?",
        options: [
            "Create single Data Extension with all possible fields using conditional mapping",
            "Implement dynamic Data Extension creation based on file structure",
            "Use multiple import templates with flexible field mapping and error tolerance",
            "Standardize all data sources to identical field structures"
        ],
        correct: 2,
        explanation: "Correct Answer: C. Multiple import templates with flexible field mapping accommodate different data structures while error tolerance prevents failures from missing fields. This approach handles business reality while maintaining reliability. Single extension (A) creates unnecessary complexity. Dynamic creation (B) risks data fragmentation. Standardization (D) may not be feasible with independent source systems."
    },

    // Cross-channel Data Tracking (Questions 13-17) & Contact Data Model (Questions 18-22)
    {
        id: 17,
        topic: "Cross-channel Data Tracking",
        question: "A client imports from three daily sources: CRM (180MB), e-commerce (350MB), customer service (95MB). Imports must complete before 6 AM for morning campaigns but experience timeouts and incomplete imports. What optimization strategy most effectively resolves these issues?",
        options: [
            "Increase timeout settings for all imports to 6 hours maximum",
            "Implement parallel processing with optimized batch sizes and staggered scheduling",
            "Convert to manual imports to avoid automated timeout restrictions",
            "Reduce imported fields to decrease file sizes and processing time"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Parallel processing with optimized batch sizes prevents resource contention while staggered scheduling ensures completion within time constraints. This approach maximizes throughput and reliability within system limits. Extended timeouts (A) don't address performance bottlenecks. Manual imports (C) aren't scalable and increase error risk. Field reduction (D) may eliminate data needed for personalization and analytics."
    },

    {
        id: 18,
        topic: "Contact Data Model & Relationships",
        question: "Your client's import process includes customer demographics, purchase history, and behavioral data requiring data consistency across all imports. They need to handle scenarios where demographic imports fail but other imports succeed. What architecture maintains data integrity?",
        options: [
            "Run all imports simultaneously to maintain temporal consistency",
            "Implement sequential workflow with rollback capabilities and comprehensive error handling",
            "Use independent import schedules to minimize interdependencies",
            "Create master import combining all sources into single file"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Sequential workflow ensures dependency management (demographics before behavioral analysis) while rollback capabilities maintain integrity during failures. Error handling enables partial recovery and issue resolution. Simultaneous imports (A) risk dependency conflicts. Independent schedules (C) may create temporal inconsistencies. Master import (D) creates single failure points and complicates error isolation."
    },

    {
        id: 19,
        topic: "Contact Data Model & Relationships",
        question: "An e-commerce client receives real-time order data via API ('Add Only') but needs daily batch correction files for returns, cancellations, and updates requiring record modifications. How should you structure data management to handle both real-time additions and batch corrections?",
        options: [
            "Use 'Add and Update' mode for both API and batch processes",
            "Implement API with 'Add Only', batch corrections with 'Update Only' using proper key matching",
            "Switch entirely to batch processing to eliminate API/batch conflicts",
            "Create separate Data Extensions for API and corrections with manual reconciliation"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Proper separation maintains data integrity: real-time orders added immediately, corrections update existing records appropriately. Key matching ensures accuracy while preserving the benefits of each approach. Universal 'Add and Update' (A) risks unintended data overwrites. Batch-only (C) loses real-time advantages. Separate extensions (D) require complex reconciliation and create consistency risks."
    },

    {
        id: 20,
        topic: "Contact Data Model & Relationships",
        question: "NTO needs to import customer preference data from multiple touchpoints: website preferences, email preferences, mobile app settings, and in-store preferences collected via tablets. Each source has different update frequencies and data structures. What import architecture ensures preference consistency across touchpoints?",
        options: [
            "Create separate preference Data Extensions for each touchpoint",
            "Use a master preference Data Extension with source-specific fields and merge logic",
            "Implement real-time preference synchronization across all touchpoints",
            "Use most recent preference update regardless of source"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Master preference Data Extension with source-specific fields and intelligent merge logic ensures comprehensive preference tracking while maintaining consistency. This approach handles different update patterns while providing unified preference management. Separate extensions (A) fragment preference management. Real-time sync (C) may not be feasible across all touchpoints. Most recent only (D) may lose important preference nuances from different contexts."
    },

    {
        id: 21,
        topic: "Contact Data Model & Relationships",
        question: "A global client imports customer data from regional systems with different data formats: US system uses MM/DD/YYYY dates, European system uses DD/MM/YYYY, and Asian system uses YYYY-MM-DD. They also have different currency formats and address structures. What import strategy ensures data consistency while preserving regional context?",
        options: [
            "Standardize all regional systems to use identical formats before import",
            "Implement region-specific import templates with data transformation rules and format standardization",
            "Import all data as text fields to avoid format conflicts",
            "Create separate Marketing Cloud instances for each region"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Region-specific import templates with transformation rules standardize data formats during import while preserving regional context where appropriate. This approach ensures data consistency for analytics while maintaining cultural relevance. Format standardization (A) may not be feasible across independent systems. Text-only imports (C) prevent proper data analysis and personalization. Regional instances (D) create unnecessary complexity and prevent global customer views."
    },

    {
        id: 22,
        topic: "Contact Data Model & Relationships",
        question: "Your client processes membership data from multiple clubs in their chain, each with different membership tiers, benefits structures, and activity tracking systems. They want unified member communications while preserving club-specific benefits and recognition. How should you structure the import and data organization?",
        options: [
            "Create separate Data Extensions for each club with independent campaign management",
            "Use a unified member Data Extension with club-specific attribute groups and flexible benefit mapping",
            "Implement a master-detail structure with master member records and detailed club affiliations",
            "Create club-specific Business Units with isolated data management"
        ],
        correct: 2,
        explanation: "Correct Answer: C. Master-detail structure enables unified member identity while preserving detailed club-specific information and benefits. This approach supports both chain-wide communications and club-specific personalization. Separate extensions (A) prevent unified member experiences. Single extension with attributes (B) may not handle complex club relationships well. Business Units (D) prevent cross-club member recognition and unified communications."
    },

    {
        id: 23,
        topic: "External Data Integration",
        question: "A healthcare network imports patient communication preferences from multiple practice management systems, each with different consent tracking, communication preferences, and privacy settings. HIPAA compliance requires audit trails for all preference changes. What import architecture ensures compliance while enabling effective communication management?",
        options: [
            "Import all preference data to a single extension with basic audit fields",
            "Implement practice-specific preference extensions with comprehensive audit trails and change tracking",
            "Use external compliance system for preferences and sync summary data only",
            "Maintain preferences in original systems and query in real-time for campaigns"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Practice-specific preference extensions with comprehensive audit trails ensure HIPAA compliance while enabling effective communication management. This approach maintains detailed change tracking required for healthcare while supporting personalized communications. Basic audit fields (A) may not meet HIPAA requirements. External systems (C) create integration complexity and potential compliance gaps. Real-time queries (D) may impact campaign performance and create availability dependencies."
    },

    {
        id: 24,
        topic: "External Data Integration",
        question: "A high-volume e-commerce platform needs to import customer behavior data via API with rate limits of 1000 calls per minute. They generate 150K events per hour during peak periods but need data available for triggered campaigns within 15 minutes. What import strategy handles rate limits while meeting time requirements?",
        options: [
            "Reduce data collection to stay within rate limits",
            "Implement intelligent queue management with batch processing, priority routing, and multiple API connections",
            "Switch to daily batch imports to avoid rate limiting",
            "Use external ETL platform to handle API limitations"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Intelligent queue management can batch similar requests efficiently, priority routing handles time-sensitive data first, and multiple API connections (if supported) increase throughput. This approach maximizes data ingestion within API constraints while meeting time requirements. Reducing collection (A) loses valuable behavioral data. Daily batches (C) don't meet real-time campaign requirements. External ETL (D) adds complexity and potential latency without addressing fundamental API limitations."
    },

    // External Data Integration (Questions 23-26) & Preference Management (Questions 27-30)
    {
        id: 25,
        topic: "External Data Integration",
        question: "NTO implements customer lifecycle scoring based on purchase recency, frequency, monetary value, engagement metrics, and product category preferences. Scores need updating daily and trigger different journey entry points. What data architecture best supports dynamic lifecycle scoring and journey activation?",
        options: [
            "Calculate scores during email send time using AMPscript",
            "Use SQL Query Activities to calculate scores and populate scoring Data Extensions with journey triggers",
            "Implement external scoring system with daily score imports",
            "Create static lifecycle segments updated monthly"
        ],
        correct: 1,
        explanation: "Correct Answer: B. SQL Query Activities can perform complex scoring calculations daily and populate scoring Data Extensions that trigger appropriate journey entry points. This approach ensures current scoring while enabling automated journey activation. Send-time calculation (A) impacts performance and prevents journey triggering. External systems (C) add complexity and potential latency. Static monthly updates (D) don't provide responsive lifecycle management needed for effective automation."
    },

    {
        id: 26,
        topic: "External Data Integration",
        question: "A subscription client needs churn prediction modeling using customer data: subscription history, payment patterns, support interactions, usage metrics, and engagement scores. The model should identify at-risk customers for proactive retention campaigns. How should you structure data to support both prediction modeling and campaign execution?",
        options: [
            "Export data to external analytics platform for modeling and import results",
            "Use SFMC's SQL capabilities to create predictive scoring with campaign-ready segments",
            "Implement real-time churn scoring during journey execution",
            "Create manual churn risk assessment processes"
        ],
        correct: 1,
        explanation: "Correct Answer: B. SFMC's SQL capabilities can create sophisticated predictive scoring using multiple data sources while generating campaign-ready segments directly. This approach integrates prediction with execution for seamless campaign activation. External analytics (A) adds complexity and latency. Real-time scoring (C) may be too resource-intensive. Manual assessment (D) isn't scalable and lacks predictive accuracy."
    },

    {
        id: 27,
        topic: "Preference Management",
        question: "Your client tracks customer interactions across 15+ touchpoints generating 500K+ daily interaction records. They need to identify customer journey patterns, drop-off points, and optimization opportunities while maintaining campaign performance. What data management approach balances analytical needs with operational performance?",
        options: [
            "Store all interaction data in single Data Extension for comprehensive analysis",
            "Implement tiered data architecture with real-time operational data and historical analytical data",
            "Use external analytics platform for all interaction analysis",
            "Limit interaction tracking to reduce data volume and complexity"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Tiered architecture maintains recent interaction data for real-time campaigns while archiving historical data for analytical insights. This approach balances operational performance with comprehensive analytics capabilities. Single extension (A) creates performance issues with high volumes. External analytics (C) may not integrate well with campaign execution. Limited tracking (D) reduces optimization opportunities and customer understanding."
    },

    {
        id: 28,
        topic: "Preference Management",
        question: "A retail chain needs inventory-aware email campaigns that personalize product recommendations based on local store inventory, customer location, and purchase history. Inventory data updates multiple times daily and campaigns send continuously. How should you structure data integration for real-time inventory-aware personalization?",
        options: [
            "Import inventory data daily and accept some inventory inaccuracy",
            "Use Data Stream for inventory updates with location-based Data Extensions and real-time personalization logic",
            "Query inventory systems in real-time during email send",
            "Limit recommendations to evergreen products available everywhere"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Data Stream handles frequent inventory updates efficiently while location-based Data Extensions enable local personalization. Real-time logic ensures accuracy without impacting send performance. Daily imports (A) create poor customer experiences with out-of-stock recommendations. Real-time queries (C) create performance bottlenecks and system dependencies. Evergreen limitations (D) reduce personalization effectiveness and revenue opportunities."
    },

    {
        id: 29,
        topic: "Preference Management",
        question: "NTO needs comprehensive customer data unification across online behavior, offline purchases, customer service interactions, social media engagement, and mobile app usage. They want a single customer view enabling cross-channel personalization. What data architecture approach provides the most comprehensive customer unification?",
        options: [
            "Create separate Data Extensions for each data source with manual reporting",
            "Implement a Customer 360 approach with unified contact records and related data extensions for each interaction type",
            "Use external customer data platform with Marketing Cloud integration",
            "Focus on primary channels only to reduce complexity"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Customer 360 approach with unified contact records linked to interaction-specific extensions provides comprehensive customer views while maintaining data structure integrity. This enables sophisticated cross-channel personalization and journey orchestration. Separate extensions (A) prevent unified insights. External CDP (C) adds integration complexity and potential latency. Limited channels (D) miss important customer touchpoints and reduce personalization opportunities."
    },

    {
        id: 30,
        topic: "Preference Management",
        question: "A B2B software company wants to implement progressive profiling across their customer journey, collecting additional information at strategic touchpoints without overwhelming prospects. They need to track completion rates, optimize question sequencing, and integrate collected data into lead scoring. What progressive profiling architecture provides the best balance of data collection and user experience?",
        options: [
            "Collect all required information upfront in single form to ensure completeness",
            "Implement strategic data collection points with preference centers, smart forms, and engagement-based profiling triggers",
            "Use mandatory fields in all forms to force information completion",
            "Limit data collection to essential information only to minimize friction"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Strategic data collection through preference centers, smart forms that adapt based on known information, and engagement-based triggers provide progressive profiling that improves user experience while building complete profiles over time. This approach optimizes both data quality and conversion rates. Upfront collection (A) creates high abandonment rates. Mandatory fields (C) increase friction and reduce completion. Limited collection (D) prevents comprehensive lead scoring and personalization."
    },

    {
        id: 31,
        topic: "Lifecycle Stage Tracking",
        question: "NTO needs to track customer lifecycle progression from lead through advocacy with automated stage updates based on behavior triggers: website visits, email engagement, purchase milestones, and support interactions. They want stage-based journey activation and revenue attribution. What lifecycle tracking architecture provides automated progression with accurate attribution?",
        options: [
            "Manual lifecycle stage updates based on quarterly reviews",
            "Implement behavioral scoring with automated stage progression rules, integrated data sources, and attribution tracking",
            "Use purchase history only for lifecycle stage determination",
            "Create separate tracking systems for each lifecycle stage"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Behavioral scoring with automated progression rules enables real-time lifecycle management based on comprehensive customer interactions. Integrated data sources provide complete customer views while attribution tracking measures impact at each stage. Manual updates (A) don't scale and miss real-time opportunities. Purchase-only tracking (C) ignores engagement indicators. Separate systems (D) prevent unified customer journey views and attribution."
    },

    {
        id: 32,
        topic: "Lifecycle Stage Tracking",
        question: "A B2B software company tracks prospects through a complex lifecycle: MQL, SQL, Opportunity, Customer, Expansion, Renewal, and Churn. Each stage requires specific data collection, scoring adjustments, and campaign triggers. What data architecture best supports complex B2B lifecycle management with multi-stage scoring and campaign activation?",
        options: [
            "Single Data Extension with lifecycle stage field and basic workflow",
            "Comprehensive lifecycle architecture with stage-specific Data Extensions, progressive scoring, automated triggers, and cross-stage analytics",
            "Manual stage assignment based on sales team input",
            "Simple lead scoring without lifecycle stage differentiation"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Comprehensive lifecycle architecture accommodates complex B2B requirements with stage-specific data collection, progressive scoring that evolves by stage, automated triggers for stage-appropriate campaigns, and cross-stage analytics for optimization. This supports sophisticated B2B sales cycles effectively. Single extension (A) lacks complexity for B2B needs. Manual assignment (C) doesn't scale and creates delays. Simple scoring (D) misses B2B lifecycle nuances and optimization opportunities."
    },

    // Multi-brand Data Organization (Questions 31-33) & GDPR & Compliance (Questions 34-40)
    {
        id: 33,
        topic: "Performance Optimization",
        question: "A retail client's Contact Builder contains 4.2 million contacts with complex segmentation requirements causing 15-minute query timeouts during peak campaign periods. They need immediate optimization for Black Friday preparation with complex audience building using multiple criteria. What optimization strategy provides immediate performance improvement for high-volume complex segmentation?",
        options: [
            "Reduce contact database size by removing inactive subscribers",
            "Implement strategic indexing on commonly queried fields, optimized Data Extension structure, and query optimization techniques",
            "Limit segmentation complexity to simple criteria only",
            "Move segmentation processing to off-peak hours only"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Strategic indexing dramatically improves query performance for common filters, optimized Data Extension structure reduces processing overhead, and query optimization techniques ensure efficient execution. This approach maintains segmentation sophistication while achieving necessary performance. Database reduction (A) may lose valuable contacts. Limiting complexity (C) reduces marketing effectiveness. Off-peak scheduling (D) doesn't solve urgent campaign needs and limits marketing agility."
    },

    {
        id: 34,
        topic: "Performance Optimization",
        question: "A subscription service's Marketing Cloud instance processes 850K daily behavioral events, 280K email sends, and 95K journey interactions with increasing performance degradation. Import queues backup during peak periods and campaign execution delays impact customer experience. What comprehensive optimization strategy addresses multi-system performance issues?",
        options: [
            "Increase system resources and processing capacity only",
            "Implement holistic optimization with data architecture improvements, processing efficiency enhancements, queue management, and monitoring systems",
            "Reduce data collection to decrease processing load",
            "Move high-volume operations to external systems"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Holistic optimization addresses root causes through improved data architecture (indexing, structure), processing efficiency (batch optimization, parallel processing), intelligent queue management, and comprehensive monitoring for proactive issue resolution. This systematic approach provides sustainable performance improvement. Resource increases alone (A) don't address inefficiencies. Data reduction (C) loses valuable insights. External systems (D) create integration complexity and may not solve core issues."
    },

    {
        id: 35,
        topic: "Multi-brand Data Organization",
        question: "A holding company manages 8 distinct brands through a single SFMC instance, each with different target audiences, data requirements, and campaign strategies. They need data governance ensuring brand isolation while enabling cross-brand customer insights and preventing data cross-contamination. What governance architecture provides appropriate brand separation with strategic data sharing?",
        options: [
            "Create completely isolated data environments for each brand",
            "Implement role-based data access with brand-specific data extensions and controlled cross-brand analytics",
            "Use single shared data repository with brand tagging for all records",
            "Create separate Marketing Cloud instances for each brand"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Role-based data access ensures brand teams only access their data while brand-specific extensions maintain operational isolation. Controlled cross-brand analytics enable strategic insights without compromising brand separation. Complete isolation (A) prevents valuable cross-brand insights. Single repository (C) risks data contamination and privacy issues. Separate instances (D) increase costs and prevent unified customer views where appropriate."
    },

    {
        id: 36,
        topic: "Multi-brand Data Organization",
        question: "An enterprise client processes millions of customer data updates daily from multiple sources and needs real-time data quality monitoring with automated issue detection and correction. They require monitoring for duplicate contacts, data validation failures, incomplete records, and suspicious data patterns. What monitoring architecture provides comprehensive data quality assurance at scale?",
        options: [
            "Manual daily data quality reviews with spreadsheet tracking",
            "Automated data quality monitoring with real-time validation, anomaly detection, automated correction workflows, and executive dashboards",
            "Weekly batch data quality reports with manual issue resolution",
            "Basic import error notifications only"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Automated monitoring with real-time validation catches issues immediately, anomaly detection identifies suspicious patterns, automated correction workflows resolve common issues without manual intervention, and executive dashboards provide visibility into data quality trends. This comprehensive approach ensures data quality at enterprise scale. Manual reviews (A) don't scale with high volumes. Weekly reports (C) allow quality issues to impact campaigns. Basic notifications (D) don't address systemic quality issues or provide trend analysis."
    },

    {
        id: 37,
        topic: "GDPR & Compliance",
        question: "A financial services client receives GDPR 'Right to be Forgotten' request for a customer with data across 12 Data Extensions, active journeys, historical sends, and synchronized CRM records. What comprehensive approach ensures complete data removal while maintaining compliance documentation?",
        options: [
            "Delete customer email address from all Data Extensions manually",
            "Use Contact Delete functionality with audit documentation and cross-system verification",
            "Mark customer as 'Do Not Contact' and maintain historical data",
            "Archive customer data to separate compliant storage system"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Contact Delete functionality systematically removes customer data from all Marketing Cloud applications while maintaining required audit trails. Cross-system verification ensures complete removal across integrated systems. Manual deletion (A) risks incomplete removal. Do Not Contact (C) doesn't satisfy deletion rights. Archiving (D) doesn't comply with deletion requirements and may violate GDPR."
    },

    {
        id: 38,
        topic: "GDPR & Compliance",
        question: "Your global client operates under multiple privacy regulations: GDPR (EU) flexible retention, CCPA (California) 12-month marketing data, PIPEDA (Canada) 2-year transaction data, and Japan's APPI with specific consent requirements. They need automated compliance management. How should you architect region-specific data retention?",
        options: [
            "Apply shortest retention period (12 months) globally for simplicity",
            "Implement region-specific Data Extensions with automated retention policies and compliance workflows",
            "Maintain all data indefinitely with access restrictions based on regional requirements",
            "Create manual quarterly compliance reviews and data purging processes"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Region-specific Data Extensions with automated retention policies ensure compliance with varying requirements while maintaining operational efficiency. Compliance workflows provide necessary audit trails and systematic management. Global shortest period (A) may violate business needs and some regulations. Indefinite retention (C) doesn't meet legal requirements. Manual processes (D) are error-prone and don't scale with global operations."
    },

    {
        id: 39,
        topic: "GDPR & Compliance",
        question: "NTO implements comprehensive consent management across email, SMS, push notifications, and direct mail with granular preferences and legal basis tracking for GDPR compliance. They need audit-ready documentation and flexible consent options. What consent architecture most effectively meets these requirements?",
        options: [
            "Use standard Marketing Cloud subscription management with basic opt-in/opt-out",
            "Create comprehensive consent Data Extension with channel-specific preferences, legal basis tracking, and timestamp audit fields",
            "Implement external consent management platform with Marketing Cloud integration",
            "Create separate preference centers for each communication channel"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Comprehensive consent Data Extension with detailed channel preferences, legal basis documentation, and complete audit trails provides GDPR-compliant consent management within Marketing Cloud. This approach ensures granular control and complete documentation. Standard subscription management (A) lacks GDPR granularity. External platforms (C) create integration complexity and potential compliance gaps. Separate centers (D) fragment user experience and complicate compliance management."
    },

    {
        id: 40,
        topic: "Multi-brand Data Organization",
        question: "A media conglomerate operates 12 brands across different industries (fashion, automotive, technology, healthcare) in a single SFMC instance. Each brand has unique compliance requirements, customer segmentation needs, and campaign approval workflows. What multi-brand architecture provides appropriate operational separation while enabling cross-brand customer insights and economies of scale?",
        options: [
            "Create separate Marketing Cloud instances for each brand to ensure complete isolation",
            "Implement Business Units with brand-specific data architecture, role-based access, shared analytics frameworks, and centralized governance",
            "Use single shared data model with brand field tags for all customer data",
            "Create brand-specific folders only with shared Data Extensions across all brands"
        ],
        correct: 1,
        explanation: "Correct Answer: B. Business Units provide operational separation while shared analytics frameworks enable cross-brand insights. Role-based access ensures brand teams access only their data while centralized governance maintains consistency and compliance. This architecture scales effectively with economies of scale. Separate instances (A) increase costs and prevent cross-brand insights. Single model with tags (C) risks data contamination. Folder-only separation (D) doesn't provide adequate data isolation and governance."
    }
];

/**
 * Export the questions for use in testing and certification preparation
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = advancedLesson2Questions;
}

/**
 * Utility functions for question management
 */
const QuestionUtils = {
    /**
     * Get questions by topic
     */
    getByTopic: (topic) => {
        return advancedLesson2Questions.filter(q => q.topic === topic);
    },

    /**
     * Get random subset of questions
     */
    getRandomQuestions: (count) => {
        const shuffled = [...advancedLesson2Questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    },

    /**
     * Get all available topics
     */
    getTopics: () => {
        return [...new Set(advancedLesson2Questions.map(q => q.topic))];
    },

    /**
     * Validate question format
     */
    validateQuestion: (question) => {
        const required = ['id', 'topic', 'question', 'options', 'correct', 'explanation'];
        return required.every(field => question.hasOwnProperty(field)) &&
               Array.isArray(question.options) &&
               question.options.length === 4 &&
               typeof question.correct === 'number' &&
               question.correct >= 0 &&
               question.correct < 4;
    }
};

// Topic distribution validation
const topicDistribution = {
    "Contact Keys Fundamentals": 6,
    "Contact Builder Populations vs Data Extensions": 6,
    "Cross-channel Data Tracking": 5,
    "Contact Data Model & Relationships": 5,
    "External Data Integration": 4,
    "Preference Management": 4,
    "GDPR & Compliance": 4,
    "Multi-brand Data Organization": 3,
    "Lifecycle Stage Tracking": 2,
    "Performance Optimization": 2
};

const actualDistribution = {};
advancedLesson2Questions.forEach(q => {
    if (!actualDistribution[q.topic]) {
        actualDistribution[q.topic] = 0;
    }
    actualDistribution[q.topic]++;
});

console.log(`✅ Lesson 2: Contact Builder & Data Management - Comprehensive Certification Questions loaded successfully!`);
console.log(`📊 Total Questions: ${advancedLesson2Questions.length}`);
console.log(`🎯 Topics Covered: ${QuestionUtils.getTopics().length}`);
console.log(`📈 Topic Distribution:`, actualDistribution);
console.log(`🏆 Ready for SFMC Email Specialist Certification Practice - Contact Builder & Data Management (26-29% of Exam)!`);