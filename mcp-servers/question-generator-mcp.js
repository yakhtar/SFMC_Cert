#!/usr/bin/env node

/**
 * Question Generator MCP Server
 * Specialized for creating high-quality certification questions with business scenarios
 * 
 * Features:
 * - Generates realistic business contexts
 * - Creates multiple choice questions with detailed explanations
 * - Maintains question quality and consistency
 * - Supports multiple certification types and difficulty levels
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from 'fs/promises';
import path from 'path';

class QuestionGeneratorMCP {
  constructor() {
    this.server = new Server(
      {
        name: "question-generator-mcp",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );
    
    // Business scenario templates
    this.businessContexts = {
      technology: [
        "TechCorp", "DataSystems Inc", "CloudTech Solutions", "InnovateIT", 
        "DigitalFirst Corp", "TechUniverse", "CyberSolutions", "DataFlow Systems"
      ],
      healthcare: [
        "HealthSystem", "MedTech Corp", "CareFirst Hospital", "HealthData Inc",
        "MedSolutions", "WellCare Systems", "HealthTech", "MedicalData Corp"
      ],
      finance: [
        "GlobalBank", "FinanceFirst", "SecureBank", "DataBank Corp",
        "InvestmentTech", "BankingSystem", "FinTech Solutions", "CreditCorp"
      ],
      retail: [
        "RetailPlus", "ShopCorp", "E-CommerceHub", "MegaRetail", "StoreChain",
        "MarketPlace Inc", "RetailTech", "ShoppingSystems"
      ],
      manufacturing: [
        "ManufacturingCorp", "ProductionTech", "FactorySystem", "MakeCorp",
        "IndustrialData", "ProductionFirst", "ManufacturingHub", "BuildTech"
      ]
    };
    
    // Question templates by certification type
    this.questionTemplates = {
      sql: {
        beginner: [
          "basic_select", "filtering", "sorting", "aggregation", "simple_joins"
        ],
        intermediate: [
          "complex_joins", "subqueries", "window_functions", "ctes", "analytics"
        ],
        advanced: [
          "performance_tuning", "recursive_queries", "optimization", "large_scale"
        ]
      },
      cloud: {
        beginner: [
          "basic_services", "security_fundamentals", "storage_basics", "networking"
        ],
        intermediate: [
          "architecture_design", "cost_optimization", "monitoring", "automation"
        ],
        advanced: [
          "enterprise_architecture", "disaster_recovery", "compliance", "migration"
        ]
      },
      security: {
        beginner: [
          "security_basics", "authentication", "authorization", "encryption_basics"
        ],
        intermediate: [
          "threat_analysis", "incident_response", "security_architecture", "compliance"
        ],
        advanced: [
          "advanced_threats", "security_engineering", "risk_management", "forensics"
        ]
      }
    };
    
    this.setupToolHandlers();
  }
  
  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "generate_question_bank",
          description: "Generate a comprehensive question bank for a certification",
          inputSchema: {
            type: "object",
            properties: {
              certificationName: {
                type: "string",
                description: "Name of the certification (e.g., 'Oracle 1Z0-071', 'AWS SAA')"
              },
              certificationDomain: {
                type: "string",
                enum: ["sql", "cloud", "security", "networking", "programming"],
                description: "Domain of the certification"
              },
              difficulty: {
                type: "string",
                enum: ["beginner", "intermediate", "advanced"],
                description: "Question difficulty level"
              },
              questionCount: {
                type: "number",
                description: "Number of questions to generate"
              },
              businessSectors: {
                type: "array",
                items: { type: "string" },
                description: "Business sectors to use for scenarios (e.g., healthcare, finance)"
              }
            },
            required: ["certificationName", "certificationDomain", "difficulty", "questionCount"]
          }
        },
        {
          name: "create_single_question",
          description: "Create a single high-quality certification question",
          inputSchema: {
            type: "object",
            properties: {
              topic: {
                type: "string",
                description: "Specific topic for the question"
              },
              difficulty: {
                type: "string",
                enum: ["beginner", "intermediate", "advanced"]
              },
              businessContext: {
                type: "string",
                description: "Business scenario context"
              },
              questionFormat: {
                type: "string",
                enum: ["multiple_choice", "scenario_based", "technical_analysis"],
                description: "Format of the question"
              },
              includeExplanations: {
                type: "boolean",
                description: "Include detailed explanations for all options"
              }
            },
            required: ["topic", "difficulty"]
          }
        },
        {
          name: "validate_question_quality",
          description: "Validate question quality against certification standards",
          inputSchema: {
            type: "object",
            properties: {
              question: {
                type: "object",
                description: "Question object to validate"
              },
              certificationStandards: {
                type: "object",
                description: "Standards to validate against"
              }
            },
            required: ["question"]
          }
        },
        {
          name: "generate_business_scenario",
          description: "Generate realistic business scenario for certification questions",
          inputSchema: {
            type: "object",
            properties: {
              industry: {
                type: "string",
                enum: ["technology", "healthcare", "finance", "retail", "manufacturing"],
                description: "Industry for the scenario"
              },
              complexity: {
                type: "string",
                enum: ["simple", "moderate", "complex"],
                description: "Scenario complexity level"
              },
              technicalFocus: {
                type: "string",
                description: "Technical area to focus on"
              }
            },
            required: ["industry"]
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      try {
        switch (name) {
          case "generate_question_bank":
            return await this.generateQuestionBank(args);
          case "create_single_question":
            return await this.createSingleQuestion(args);
          case "validate_question_quality":
            return await this.validateQuestionQuality(args);
          case "generate_business_scenario":
            return await this.generateBusinessScenario(args);
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
  
  async generateQuestionBank({ certificationName, certificationDomain, difficulty, questionCount, businessSectors = [] }) {
    try {
      const questionBank = {
        certification: certificationName,
        domain: certificationDomain,
        difficulty: difficulty,
        generatedAt: new Date().toISOString(),
        questions: []
      };
      
      // Get question templates for this domain and difficulty
      const templates = this.questionTemplates[certificationDomain]?.[difficulty] || [];
      if (templates.length === 0) {
        throw new Error(`No templates available for ${certificationDomain} ${difficulty}`);
      }
      
      // Generate questions
      for (let i = 0; i < questionCount; i++) {
        const template = templates[i % templates.length];
        const sector = businessSectors.length > 0 ? 
          businessSectors[i % businessSectors.length] : 
          this.getRandomSector();
        
        const question = await this.generateQuestionFromTemplate({
          template: template,
          difficulty: difficulty,
          sector: sector,
          domain: certificationDomain,
          questionNumber: i + 1
        });
        
        questionBank.questions.push(question);
      }
      
      // Save question bank
      const filename = `${certificationName.replace(/\s+/g, '-')}-${difficulty}-${questionCount}q.json`;
      const outputPath = `./question-banks/${filename}`;
      await this.ensureDirectoryExists(path.dirname(outputPath));
      await fs.writeFile(outputPath, JSON.stringify(questionBank, null, 2));
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(questionBank, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new Error(`Failed to generate question bank: ${error.message}`);
    }
  }
  
  async createSingleQuestion({ topic, difficulty, businessContext, questionFormat = "multiple_choice", includeExplanations = true }) {
    try {
      const question = {
        id: Date.now(),
        topic: topic,
        difficulty: difficulty,
        format: questionFormat,
        createdAt: new Date().toISOString(),
        question: "",
        options: [],
        correctAnswer: "",
        explanation: "",
        incorrectExplanations: {},
        keyPoints: [],
        businessContext: businessContext || this.generateRandomBusinessContext(),
        schema: "",
        sampleData: ""
      };
      
      // Generate question based on topic and difficulty
      const generatedQuestion = this.generateQuestionContent(topic, difficulty, question.businessContext);
      Object.assign(question, generatedQuestion);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(question, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new Error(`Failed to create single question: ${error.message}`);
    }
  }
  
  async validateQuestionQuality({ question, certificationStandards = {} }) {
    try {
      const validationResults = {
        isValid: true,
        score: 0,
        maxScore: 100,
        issues: [],
        recommendations: [],
        validatedAt: new Date().toISOString()
      };
      
      // Validate question structure
      this.validateQuestionStructure(question, validationResults);
      
      // Validate content quality
      this.validateContentQuality(question, validationResults);
      
      // Validate against certification standards
      this.validateCertificationStandards(question, certificationStandards, validationResults);
      
      // Calculate final score
      validationResults.score = Math.max(0, 100 - (validationResults.issues.length * 10));
      validationResults.isValid = validationResults.score >= 70;
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(validationResults, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new Error(`Failed to validate question quality: ${error.message}`);
    }
  }
  
  async generateBusinessScenario({ industry, complexity = "moderate", technicalFocus }) {
    try {
      const companyName = this.getRandomCompanyName(industry);
      const scenario = this.createBusinessScenario(companyName, industry, complexity, technicalFocus);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(scenario, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new Error(`Failed to generate business scenario: ${error.message}`);
    }
  }
  
  // Helper methods
  async generateQuestionFromTemplate({ template, difficulty, sector, domain, questionNumber }) {
    const companyName = this.getRandomCompanyName(sector);
    
    // Template-specific generation logic
    switch (template) {
      case "basic_select":
        return this.generateBasicSelectQuestion(companyName, sector);
      case "complex_joins":
        return this.generateComplexJoinQuestion(companyName, sector);
      case "performance_tuning":
        return this.generatePerformanceQuestion(companyName, sector);
      case "basic_services":
        return this.generateCloudServicesQuestion(companyName, sector);
      case "security_basics":
        return this.generateSecurityBasicsQuestion(companyName, sector);
      default:
        return this.generateGenericQuestion(template, companyName, sector, difficulty);
    }
  }
  
  generateBasicSelectQuestion(companyName, sector) {
    const tables = this.getSectorTables(sector);
    const table = tables[0];
    
    return {
      question: `${companyName} needs to retrieve all ${table.description} from their database. Which SQL statement correctly selects all columns from the ${table.name} table?`,
      concept: "Basic SELECT Statements",
      schema: `${table.name} table: ${table.columns.join(", ")}`,
      sampleData: table.sampleData,
      options: [
        { letter: "A", text: `SELECT * FROM ${table.name}`, correct: true },
        { letter: "B", text: `SELECT ALL FROM ${table.name}`, correct: false },
        { letter: "C", text: `GET * FROM ${table.name}`, correct: false },
        { letter: "D", text: `RETRIEVE ALL FROM ${table.name}`, correct: false }
      ],
      correctAnswer: "A",
      explanation: `Option A is correct because SELECT * is the standard SQL syntax for retrieving all columns from a table.`,
      incorrectExplanations: {
        "B": "ALL is not the correct syntax for selecting all columns. Use * (asterisk) instead.",
        "C": "GET is not a valid SQL command. SQL uses SELECT for data retrieval.",
        "D": "RETRIEVE is not a standard SQL command. Use SELECT instead."
      },
      keyPoints: [
        "SELECT * retrieves all columns from a table",
        "* (asterisk) is the wildcard for all columns",
        "SELECT is the standard SQL command for data retrieval",
        "Always specify the table name with FROM clause"
      ]
    };
  }
  
  generateComplexJoinQuestion(companyName, sector) {
    const tables = this.getSectorTables(sector);
    
    return {
      question: `${companyName} needs to analyze relationships between ${tables[0].description} and ${tables[1].description}. Which JOIN type returns only records that exist in both tables?`,
      concept: "SQL JOINs",
      schema: `${tables[0].name} table: ${tables[0].columns.join(", ")}. ${tables[1].name} table: ${tables[1].columns.join(", ")}`,
      sampleData: `${tables[0].sampleData}. ${tables[1].sampleData}`,
      options: [
        { letter: "A", text: "INNER JOIN", correct: true },
        { letter: "B", text: "LEFT JOIN", correct: false },
        { letter: "C", text: "RIGHT JOIN", correct: false },
        { letter: "D", text: "FULL OUTER JOIN", correct: false }
      ],
      correctAnswer: "A",
      explanation: "INNER JOIN returns only records that have matching values in both tables.",
      incorrectExplanations: {
        "B": "LEFT JOIN returns all records from the left table, including non-matching ones.",
        "C": "RIGHT JOIN returns all records from the right table, including non-matching ones.",
        "D": "FULL OUTER JOIN returns all records when there's a match in either table."
      },
      keyPoints: [
        "INNER JOIN only returns matching records from both tables",
        "Other JOIN types include non-matching records",
        "Choose JOIN type based on data requirements",
        "INNER JOIN is the most restrictive JOIN type"
      ]
    };
  }
  
  generatePerformanceQuestion(companyName, sector) {
    return {
      question: `${companyName} processes millions of transactions daily. Their reporting queries are taking too long to execute. Which optimization strategy would provide the best performance improvement for recurring analytical reports?`,
      concept: "Performance Optimization",
      schema: "TRANSACTIONS table with 50M+ records, complex analytical queries, reporting requirements",
      sampleData: "Large-scale transactional data with performance challenges",
      options: [
        { letter: "A", text: "Create materialized views for pre-aggregated data", correct: true },
        { letter: "B", text: "Add more indexes on all columns", correct: false },
        { letter: "C", text: "Increase parallel processing degree", correct: false },
        { letter: "D", text: "Use DISTINCT in all queries", correct: false }
      ],
      correctAnswer: "A",
      explanation: "Materialized views pre-aggregate data, dramatically reducing query time for recurring reports.",
      incorrectExplanations: {
        "B": "Too many indexes can actually hurt performance and don't address aggregation overhead.",
        "C": "Parallel processing helps but doesn't solve the fundamental issue of repeated aggregation.",
        "D": "DISTINCT adds processing overhead and doesn't improve analytical query performance."
      },
      keyPoints: [
        "Materialized views excel for recurring analytical queries",
        "Pre-aggregation reduces data processing volume",
        "Consider query patterns when optimizing performance",
        "Balance query speed against data freshness requirements"
      ]
    };
  }
  
  generateCloudServicesQuestion(companyName, sector) {
    return {
      question: `${companyName} wants to migrate their on-premises database to the cloud. They need high availability and automatic scaling. Which cloud database service best meets these requirements?`,
      concept: "Cloud Database Services",
      schema: "On-premises to cloud migration, high availability, automatic scaling requirements",
      sampleData: "Traditional database infrastructure transitioning to cloud",
      options: [
        { letter: "A", text: "Managed database service with auto-scaling", correct: true },
        { letter: "B", text: "Virtual machine with self-managed database", correct: false },
        { letter: "C", text: "Object storage service", correct: false },
        { letter: "D", text: "Content delivery network", correct: false }
      ],
      correctAnswer: "A",
      explanation: "Managed database services provide built-in high availability and automatic scaling features.",
      incorrectExplanations: {
        "B": "Self-managed databases on VMs don't provide automatic scaling or managed high availability.",
        "C": "Object storage is for file storage, not database operations.",
        "D": "CDN is for content distribution, not database hosting."
      },
      keyPoints: [
        "Managed services reduce operational overhead",
        "Auto-scaling adapts to demand automatically",
        "High availability is built into managed database services",
        "Consider operational requirements when choosing cloud services"
      ]
    };
  }
  
  generateSecurityBasicsQuestion(companyName, sector) {
    return {
      question: `${companyName} needs to secure their database containing sensitive customer information. Which security measure should be implemented first?`,
      concept: "Database Security Fundamentals",
      schema: "Customer database with sensitive information, security requirements",
      sampleData: "Customer PII, financial data, security compliance needs",
      options: [
        { letter: "A", text: "Encrypt data at rest and in transit", correct: true },
        { letter: "B", text: "Create more user accounts", correct: false },
        { letter: "C", text: "Install antivirus software", correct: false },
        { letter: "D", text: "Increase password complexity only", correct: false }
      ],
      correctAnswer: "A",
      explanation: "Encryption protects sensitive data both when stored and transmitted.",
      incorrectExplanations: {
        "B": "More user accounts without proper controls can increase security risks.",
        "C": "Antivirus is important but doesn't protect data confidentiality like encryption.",
        "D": "Password complexity alone is insufficient for comprehensive data protection."
      },
      keyPoints: [
        "Encryption is fundamental for data protection",
        "Protect data both at rest and in transit",
        "Implement defense in depth security strategies",
        "Address data confidentiality as primary concern"
      ]
    };
  }
  
  generateGenericQuestion(template, companyName, sector, difficulty) {
    return {
      question: `${companyName} faces a ${template} challenge in their ${sector} operations. What is the best approach to solve this?`,
      concept: template.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      schema: `Generic ${sector} scenario requiring ${template} knowledge`,
      sampleData: `Sample data for ${sector} industry ${template} scenario`,
      options: [
        { letter: "A", text: "Implement best practice solution", correct: true },
        { letter: "B", text: "Use outdated approach", correct: false },
        { letter: "C", text: "Ignore the problem", correct: false },
        { letter: "D", text: "Apply incorrect methodology", correct: false }
      ],
      correctAnswer: "A",
      explanation: "Best practice solutions are designed for optimal results in professional scenarios.",
      incorrectExplanations: {
        "B": "Outdated approaches may not be efficient or secure.",
        "C": "Ignoring problems leads to larger issues later.",
        "D": "Incorrect methodologies produce unreliable results."
      },
      keyPoints: [
        "Follow industry best practices",
        "Stay current with modern approaches",
        "Address issues proactively",
        "Use proven methodologies"
      ]
    };
  }
  
  getRandomSector() {
    const sectors = Object.keys(this.businessContexts);
    return sectors[Math.floor(Math.random() * sectors.length)];
  }
  
  getRandomCompanyName(sector) {
    const companies = this.businessContexts[sector] || this.businessContexts.technology;
    return companies[Math.floor(Math.random() * companies.length)];
  }
  
  getSectorTables(sector) {
    const tablesBySector = {
      technology: [
        { 
          name: "employees", 
          description: "employee information",
          columns: ["employee_id (NUMBER)", "first_name (VARCHAR2)", "last_name (VARCHAR2)", "department (VARCHAR2)", "salary (NUMBER)"],
          sampleData: "Software engineers, managers, analysts with salaries and departments"
        },
        {
          name: "projects",
          description: "project details", 
          columns: ["project_id (NUMBER)", "project_name (VARCHAR2)", "start_date (DATE)", "budget (NUMBER)", "status (VARCHAR2)"],
          sampleData: "Software development projects with budgets and timelines"
        }
      ],
      healthcare: [
        {
          name: "patients",
          description: "patient records",
          columns: ["patient_id (NUMBER)", "patient_name (VARCHAR2)", "birth_date (DATE)", "insurance_type (VARCHAR2)"],
          sampleData: "Patient demographic and insurance information"
        },
        {
          name: "treatments",
          description: "medical treatments",
          columns: ["treatment_id (NUMBER)", "patient_id (NUMBER)", "treatment_type (VARCHAR2)", "cost (NUMBER)", "treatment_date (DATE)"],
          sampleData: "Medical procedures, costs, and dates"
        }
      ],
      finance: [
        {
          name: "accounts",
          description: "customer accounts",
          columns: ["account_id (NUMBER)", "customer_id (NUMBER)", "account_type (VARCHAR2)", "balance (NUMBER)", "open_date (DATE)"],
          sampleData: "Banking accounts with balances and types"
        },
        {
          name: "transactions", 
          description: "financial transactions",
          columns: ["transaction_id (NUMBER)", "account_id (NUMBER)", "amount (NUMBER)", "transaction_date (DATE)", "type (VARCHAR2)"],
          sampleData: "Deposits, withdrawals, and transfers"
        }
      ]
    };
    
    return tablesBySector[sector] || tablesBySector.technology;
  }
  
  generateRandomBusinessContext() {
    const sector = this.getRandomSector();
    const company = this.getRandomCompanyName(sector);
    return `${company} (${sector} industry)`;
  }
  
  generateQuestionContent(topic, difficulty, businessContext) {
    // Basic question generation - in real implementation, this would be more sophisticated
    return {
      question: `In the context of ${businessContext}, which approach best addresses ${topic} requirements at ${difficulty} level?`,
      concept: topic,
      schema: `Schema relevant to ${topic} in ${businessContext}`,
      sampleData: `Sample data for ${topic} scenario`,
      options: [
        { letter: "A", text: "Correct approach", correct: true },
        { letter: "B", text: "Incorrect option 1", correct: false },
        { letter: "C", text: "Incorrect option 2", correct: false },
        { letter: "D", text: "Incorrect option 3", correct: false }
      ],
      correctAnswer: "A",
      explanation: "This is the correct approach based on best practices.",
      incorrectExplanations: {
        "B": "This approach has limitations.",
        "C": "This option is not optimal.",
        "D": "This choice would not work well."
      },
      keyPoints: [
        "Key learning point 1",
        "Key learning point 2", 
        "Key learning point 3",
        "Key learning point 4"
      ]
    };
  }
  
  createBusinessScenario(companyName, industry, complexity, technicalFocus) {
    const scenarios = {
      simple: `${companyName} is a ${industry} company that needs to ${technicalFocus || 'solve a basic technical challenge'}.`,
      moderate: `${companyName}, a growing ${industry} organization, faces challenges with ${technicalFocus || 'their technical infrastructure'} and needs to implement solutions that scale with their business.`,
      complex: `${companyName} is a large ${industry} enterprise operating globally with complex ${technicalFocus || 'technical requirements'}, regulatory compliance needs, and multiple stakeholder requirements that must be balanced.`
    };
    
    return {
      companyName: companyName,
      industry: industry,
      complexity: complexity,
      scenario: scenarios[complexity],
      technicalFocus: technicalFocus,
      suggestedTables: this.getSectorTables(industry)
    };
  }
  
  validateQuestionStructure(question, results) {
    const requiredFields = ['question', 'options', 'correctAnswer', 'explanation'];
    
    for (const field of requiredFields) {
      if (!question[field]) {
        results.issues.push(`Missing required field: ${field}`);
      }
    }
    
    if (question.options && question.options.length !== 4) {
      results.issues.push("Question should have exactly 4 options");
    }
    
    if (question.correctAnswer && !question.options?.some(opt => opt.letter === question.correctAnswer)) {
      results.issues.push("Correct answer doesn't match any option letter");
    }
  }
  
  validateContentQuality(question, results) {
    if (question.question && question.question.length < 50) {
      results.issues.push("Question text is too short - should be more descriptive");
    }
    
    if (question.explanation && question.explanation.length < 30) {
      results.issues.push("Explanation is too brief");
    }
    
    if (!question.businessContext) {
      results.recommendations.push("Consider adding business context for more realistic scenarios");
    }
    
    if (!question.keyPoints || question.keyPoints.length < 3) {
      results.recommendations.push("Add more key learning points");
    }
  }
  
  validateCertificationStandards(question, standards, results) {
    // Validate against specific certification standards
    if (standards.requireBusinessContext && !question.businessContext) {
      results.issues.push("Business context required for this certification");
    }
    
    if (standards.minExplanationLength && question.explanation.length < standards.minExplanationLength) {
      results.issues.push(`Explanation must be at least ${standards.minExplanationLength} characters`);
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
    console.error("Question Generator MCP Server running on stdio");
  }
}

const server = new QuestionGeneratorMCP();
server.run().catch(console.error);