#!/usr/bin/env node

/**
 * AI Consulting MCP Server
 * Provides guidance on becoming an AI consultant, client scenarios, and business development
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

class AIConsultingServer {
  constructor() {
    this.server = new Server(
      {
        name: 'ai-consulting-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    // AI consulting scenarios and client examples
    this.clientScenarios = [
      {
        client: "MidSize Manufacturing Corp",
        industry: "Manufacturing",
        size: "500 employees, $150M revenue",
        challenge: "Manual quality inspection process causing 15% defect rate and production delays",
        current_state: "Visual inspection by human workers, Excel-based tracking, no predictive maintenance",
        pain_points: ["High defect costs ($2M annually)", "Worker fatigue errors", "Reactive maintenance only"],
        budget: "$200K implementation, $50K ongoing",
        timeline: "9-month implementation",
        stakeholders: ["COO", "Plant Manager", "IT Director", "Quality Manager"],
        success_criteria: ["Reduce defects to <3%", "25% faster inspection", "Predictive maintenance ROI"],
        technical_requirements: ["Computer vision system", "IoT sensors", "Edge computing", "Integration with ERP"]
      },
      {
        client: "Regional Healthcare Network",
        industry: "Healthcare",
        size: "12 hospitals, 15,000 employees",
        challenge: "Physician burnout from administrative tasks and inefficient patient scheduling",
        current_state: "Manual scheduling, paper-based documentation, fragmented patient data",
        pain_points: ["3-hour daily admin work per physician", "30% no-show rate", "Patient satisfaction declining"],
        budget: "$500K implementation, $100K ongoing",
        timeline: "12-month rollout across network",
        stakeholders: ["Chief Medical Officer", "CIO", "Department Heads", "Compliance Officer"],
        success_criteria: ["50% reduction in admin time", "15% improvement in scheduling efficiency", "HIPAA compliance maintained"],
        technical_requirements: ["NLP for documentation", "Predictive scheduling", "Patient communication automation", "EMR integration"]
      },
      {
        client: "E-commerce Retailer",
        industry: "Retail/E-commerce",
        size: "250 employees, $75M revenue",
        challenge: "Cart abandonment rate of 70% and poor product recommendation accuracy",
        current_state: "Basic rule-based recommendations, generic email campaigns, limited personalization",
        pain_points: ["$15M lost revenue from abandoned carts", "Low email engagement (2% CTR)", "Poor inventory turnover"],
        budget: "$150K implementation, $30K ongoing",
        timeline: "6-month implementation",
        stakeholders: ["CMO", "CTO", "Head of E-commerce", "Data Team Lead"],
        success_criteria: ["Reduce abandonment to 50%", "Double recommendation CTR", "20% increase in AOV"],
        technical_requirements: ["ML recommendation engine", "Real-time personalization", "Automated email campaigns", "A/B testing framework"]
      },
      {
        client: "Financial Services Firm",
        industry: "Financial Services",
        size: "1,200 employees, $2B AUM",
        challenge: "Regulatory compliance monitoring and fraud detection taking too many manual hours",
        current_state: "Manual transaction reviews, quarterly compliance audits, reactive fraud response",
        pain_points: ["$5M compliance costs annually", "3-day fraud investigation average", "Regulatory audit stress"],
        budget: "$750K implementation, $150K ongoing",
        timeline: "15-month phased rollout",
        stakeholders: ["Chief Risk Officer", "Compliance Director", "CTO", "Internal Audit"],
        success_criteria: ["90% automated compliance monitoring", "Real-time fraud detection", "Pass regulatory audits"],
        technical_requirements: ["Anomaly detection models", "Regulatory reporting automation", "Real-time monitoring", "Audit trail systems"]
      }
    ];

    this.consultingServices = {
      strategy_consulting: {
        description: "High-level AI strategy and roadmap development",
        typical_duration: "2-6 months",
        deliverables: ["AI readiness assessment", "Strategic roadmap", "ROI projections", "Implementation timeline"],
        pricing: "$150-300/hour",
        skills_needed: ["Business strategy", "Technology assessment", "Change management", "Financial modeling"]
      },
      implementation_consulting: {
        description: "Hands-on AI project implementation and deployment",
        typical_duration: "6-18 months",
        deliverables: ["Working AI solutions", "Technical documentation", "Team training", "Deployment support"],
        pricing: "$200-400/hour",
        skills_needed: ["Technical implementation", "Project management", "Team leadership", "Quality assurance"]
      },
      advisory_services: {
        description: "Ongoing guidance and optimization of AI initiatives",
        typical_duration: "Ongoing retainer",
        deliverables: ["Monthly reviews", "Performance optimization", "Strategic adjustments", "Team mentoring"],
        pricing: "$10K-50K/month retainer",
        skills_needed: ["Performance analysis", "Optimization techniques", "Team development", "Industry expertise"]
      },
      training_services: {
        description: "AI literacy and skills training for client teams",
        typical_duration: "1-3 months",
        deliverables: ["Training curriculum", "Workshops", "Certification programs", "Knowledge transfer"],
        pricing: "$5K-15K per workshop",
        skills_needed: ["Adult education", "Curriculum development", "Public speaking", "Technical communication"]
      }
    };

    this.industryExpertise = {
      healthcare: {
        key_challenges: ["HIPAA compliance", "Physician adoption", "Integration with EMRs", "FDA regulations"],
        common_use_cases: ["Medical imaging", "Drug discovery", "Clinical decision support", "Administrative automation"],
        regulatory_considerations: ["FDA approval for medical devices", "HIPAA data handling", "Clinical trial protocols"],
        typical_projects: ["Radiology AI", "Clinical documentation", "Patient risk stratification", "Medication management"]
      },
      finance: {
        key_challenges: ["Regulatory compliance", "Data security", "Model explainability", "Risk management"],
        common_use_cases: ["Fraud detection", "Credit scoring", "Algorithmic trading", "Regulatory reporting"],
        regulatory_considerations: ["GDPR for EU clients", "Fair Credit Reporting Act", "Model validation requirements"],
        typical_projects: ["Transaction monitoring", "Customer onboarding", "Investment recommendations", "Compliance automation"]
      },
      manufacturing: {
        key_challenges: ["Legacy system integration", "Workforce concerns", "ROI demonstration", "Safety requirements"],
        common_use_cases: ["Quality control", "Predictive maintenance", "Supply chain optimization", "Process automation"],
        regulatory_considerations: ["Safety standards", "Environmental compliance", "Worker protection"],
        typical_projects: ["Computer vision QC", "Equipment monitoring", "Demand forecasting", "Production optimization"]
      },
      retail: {
        key_challenges: ["Data quality", "Customer privacy", "Seasonal variations", "Channel integration"],
        common_use_cases: ["Recommendation engines", "Demand forecasting", "Price optimization", "Customer segmentation"],
        regulatory_considerations: ["Data privacy laws", "Consumer protection", "Accessibility requirements"],
        typical_projects: ["Personalization systems", "Inventory optimization", "Marketing automation", "Customer service AI"]
      }
    };

    this.businessDevelopment = {
      lead_generation: [
        "Content marketing and thought leadership",
        "Speaking at industry conferences",
        "LinkedIn networking and content",
        "Referral partner programs",
        "Case study marketing",
        "Industry report publishing"
      ],
      qualification_criteria: [
        "Budget availability ($100K+ for meaningful projects)",
        "Executive sponsorship and commitment",
        "Data availability and quality",
        "Technical infrastructure readiness",
        "Timeline alignment with business cycles",
        "Clear success metrics and ROI expectations"
      ],
      pricing_strategies: [
        "Value-based pricing tied to business outcomes",
        "Phased approach with proof-of-concept first",
        "Hybrid model: fixed strategy phase + variable implementation",
        "Success fee components for measurable results",
        "Retainer model for ongoing advisory work",
        "Training and certification premium services"
      ]
    };
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'generate_client_scenario',
          description: 'Create realistic AI consulting client scenario with business context and challenges',
          inputSchema: {
            type: 'object',
            properties: {
              industry: {
                type: 'string',
                enum: ['healthcare', 'finance', 'manufacturing', 'retail', 'technology', 'government'],
                description: 'Client industry sector'
              },
              company_size: {
                type: 'string',
                enum: ['startup', 'small_business', 'mid_market', 'enterprise', 'fortune_500'],
                description: 'Size of client organization'
              },
              consulting_type: {
                type: 'string',
                enum: ['strategy', 'implementation', 'advisory', 'training'],
                description: 'Type of consulting engagement'
              },
              complexity: {
                type: 'string',
                enum: ['low', 'medium', 'high'],
                description: 'Project complexity level'
              }
            },
            required: ['industry']
          }
        },
        {
          name: 'create_consulting_proposal',
          description: 'Generate comprehensive consulting proposal with scope, timeline, and pricing',
          inputSchema: {
            type: 'object',
            properties: {
              client_scenario: {
                type: 'object',
                description: 'Client scenario details from generate_client_scenario'
              },
              engagement_type: {
                type: 'string',
                enum: ['strategy_only', 'strategy_plus_implementation', 'full_service', 'advisory_retainer'],
                description: 'Type of consulting engagement'
              },
              budget_range: {
                type: 'string',
                enum: ['under_100k', '100k_500k', '500k_1m', 'over_1m'],
                description: 'Client budget range'
              },
              timeline_preference: {
                type: 'string',
                enum: ['urgent', 'standard', 'flexible'],
                description: 'Client timeline requirements'
              }
            },
            required: ['engagement_type']
          }
        },
        {
          name: 'develop_ai_strategy_framework',
          description: 'Create AI strategy framework for specific industry and business context',
          inputSchema: {
            type: 'object',
            properties: {
              industry: {
                type: 'string',
                description: 'Target industry'
              },
              business_objectives: {
                type: 'array',
                items: { type: 'string' },
                description: 'Primary business objectives'
              },
              current_maturity: {
                type: 'string',
                enum: ['beginner', 'developing', 'advanced', 'leading'],
                description: 'Current AI maturity level'
              },
              focus_areas: {
                type: 'array',
                items: { type: 'string' },
                description: 'Key areas for AI implementation'
              }
            },
            required: ['industry', 'business_objectives']
          }
        },
        {
          name: 'create_roi_analysis',
          description: 'Generate ROI analysis and business case for AI implementation',
          inputSchema: {
            type: 'object',
            properties: {
              use_case: {
                type: 'string',
                description: 'Specific AI use case'
              },
              implementation_cost: {
                type: 'number',
                description: 'Estimated implementation cost'
              },
              annual_operating_cost: {
                type: 'number',
                description: 'Annual operating and maintenance cost'
              },
              current_process_cost: {
                type: 'number',
                description: 'Current annual cost of manual process'
              },
              timeline_months: {
                type: 'number',
                description: 'Implementation timeline in months'
              }
            },
            required: ['use_case', 'implementation_cost']
          }
        },
        {
          name: 'assess_ai_readiness',
          description: 'Evaluate organization readiness for AI implementation',
          inputSchema: {
            type: 'object',
            properties: {
              industry: {
                type: 'string',
                description: 'Organization industry'
              },
              data_maturity: {
                type: 'string',
                enum: ['basic', 'intermediate', 'advanced'],
                description: 'Current data management maturity'
              },
              technical_capabilities: {
                type: 'string',
                enum: ['limited', 'moderate', 'strong'],
                description: 'Internal technical capabilities'
              },
              leadership_support: {
                type: 'string',
                enum: ['skeptical', 'interested', 'committed'],
                description: 'Leadership support level'
              },
              budget_availability: {
                type: 'string',
                enum: ['constrained', 'moderate', 'flexible'],
                description: 'Budget availability for AI initiatives'
              }
            },
            required: ['industry']
          }
        },
        {
          name: 'create_business_development_plan',
          description: 'Generate business development strategy for AI consulting practice',
          inputSchema: {
            type: 'object',
            properties: {
              target_industries: {
                type: 'array',
                items: { type: 'string' },
                description: 'Industries to focus on'
              },
              experience_level: {
                type: 'string',
                enum: ['beginner', 'intermediate', 'experienced'],
                description: 'Current consulting experience level'
              },
              geographic_focus: {
                type: 'string',
                enum: ['local', 'regional', 'national', 'international'],
                description: 'Geographic market focus'
              },
              service_offerings: {
                type: 'array',
                items: {
                  type: 'string',
                  enum: ['strategy', 'implementation', 'advisory', 'training']
                },
                description: 'Consulting services to offer'
              }
            },
            required: ['target_industries', 'experience_level']
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'generate_client_scenario':
          return this.generateClientScenario(request.params.arguments);
        case 'create_consulting_proposal':
          return this.createConsultingProposal(request.params.arguments);
        case 'develop_ai_strategy_framework':
          return this.developAIStrategyFramework(request.params.arguments);
        case 'create_roi_analysis':
          return this.createROIAnalysis(request.params.arguments);
        case 'assess_ai_readiness':
          return this.assessAIReadiness(request.params.arguments);
        case 'create_business_development_plan':
          return this.createBusinessDevelopmentPlan(request.params.arguments);
        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${request.params.name}`
          );
      }
    });
  }

  async generateClientScenario(args) {
    const { industry, company_size = 'mid_market', consulting_type = 'strategy', complexity = 'medium' } = args;
    
    // Select or customize base scenario
    let baseScenario = this.clientScenarios.find(s => 
      s.industry.toLowerCase() === industry.toLowerCase()
    ) || this.clientScenarios[0];

    // Customize based on company size and complexity
    const scenario = {
      ...baseScenario,
      company_size,
      complexity_level: complexity,
      consulting_scope: consulting_type,
      industry_context: this.industryExpertise[industry] || this.industryExpertise.manufacturing,
      engagement_challenges: this.getEngagementChallenges(complexity, company_size),
      stakeholder_dynamics: this.getStakeholderDynamics(company_size),
      success_factors: this.getSuccessFactors(consulting_type, industry),
      potential_risks: this.getPotentialRisks(industry, complexity),
      competitive_landscape: this.getCompetitiveLandscape(industry),
      learning_objectives: this.getLearningObjectives(consulting_type, complexity)
    };

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(scenario, null, 2)
      }]
    };
  }

  async createConsultingProposal(args) {
    const { client_scenario = {}, engagement_type, budget_range = '100k_500k', timeline_preference = 'standard' } = args;
    
    const serviceDetails = this.consultingServices[engagement_type.replace('_only', '').replace('_plus_implementation', '').replace('_retainer', '')] || this.consultingServices.strategy_consulting;

    const proposal = {
      executive_summary: this.getExecutiveSummary(client_scenario, engagement_type),
      situation_analysis: this.getSituationAnalysis(client_scenario),
      proposed_approach: this.getProposedApproach(engagement_type, client_scenario),
      scope_of_work: this.getScopeOfWork(engagement_type, serviceDetails),
      timeline_milestones: this.getTimelineMilestones(engagement_type, timeline_preference),
      team_structure: this.getTeamStructure(engagement_type, budget_range),
      pricing_investment: this.getPricingStructure(engagement_type, budget_range, serviceDetails),
      success_metrics: this.getSuccessMetrics(client_scenario),
      risk_mitigation: this.getRiskMitigation(client_scenario),
      next_steps: this.getNextSteps(engagement_type),
      appendices: this.getAppendices(engagement_type)
    };

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(proposal, null, 2)
      }]
    };
  }

  async developAIStrategyFramework(args) {
    const { industry, business_objectives, current_maturity = 'developing', focus_areas = [] } = args;
    
    const framework = {
      strategic_foundation: {
        vision_statement: this.getVisionStatement(industry, business_objectives),
        strategic_objectives: business_objectives,
        success_definition: this.getSuccessDefinition(business_objectives)
      },
      current_state_assessment: {
        maturity_level: current_maturity,
        strengths: this.getStrengths(current_maturity, industry),
        gaps: this.getGaps(current_maturity, focus_areas),
        opportunities: this.getOpportunities(industry, focus_areas)
      },
      strategic_roadmap: {
        phase_1_quick_wins: this.getQuickWins(industry, current_maturity),
        phase_2_core_capabilities: this.getCoreCapabilities(focus_areas),
        phase_3_advanced_applications: this.getAdvancedApplications(industry),
        timeline: this.getStrategicTimeline(current_maturity)
      },
      implementation_framework: {
        governance_model: this.getGovernanceModel(business_objectives),
        technology_stack: this.getTechnologyStack(focus_areas),
        talent_strategy: this.getTalentStrategy(current_maturity),
        change_management: this.getChangeManagement(industry)
      },
      success_measurement: {
        kpis: this.getStrategicKPIs(business_objectives),
        measurement_framework: this.getMeasurementFramework(),
        reporting_cadence: this.getReportingCadence()
      }
    };

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(framework, null, 2)
      }]
    };
  }

  async createROIAnalysis(args) {
    const { 
      use_case, 
      implementation_cost, 
      annual_operating_cost = implementation_cost * 0.2,
      current_process_cost = implementation_cost * 2,
      timeline_months = 12 
    } = args;
    
    const roiAnalysis = {
      use_case_overview: {
        use_case: use_case,
        implementation_timeline: `${timeline_months} months`,
        analysis_period: "5 years"
      },
      cost_analysis: {
        initial_investment: implementation_cost,
        annual_operating_cost: annual_operating_cost,
        current_annual_cost: current_process_cost,
        total_5_year_cost: implementation_cost + (annual_operating_cost * 5)
      },
      benefit_analysis: {
        annual_cost_savings: current_process_cost - annual_operating_cost,
        efficiency_gains: this.getEfficiencyGains(use_case),
        quality_improvements: this.getQualityImprovements(use_case),
        risk_reduction: this.getRiskReduction(use_case),
        total_5_year_savings: (current_process_cost - annual_operating_cost) * 5
      },
      roi_metrics: {
        payback_period: this.calculatePaybackPeriod(implementation_cost, current_process_cost, annual_operating_cost),
        net_present_value: this.calculateNPV(implementation_cost, current_process_cost, annual_operating_cost, 5, 0.1),
        roi_percentage: this.calculateROI(implementation_cost, current_process_cost, annual_operating_cost, 5),
        break_even_point: this.calculateBreakEven(implementation_cost, current_process_cost, annual_operating_cost)
      },
      sensitivity_analysis: this.getSensitivityAnalysis(implementation_cost, current_process_cost, annual_operating_cost),
      implementation_phases: this.getImplementationPhases(timeline_months, use_case),
      risk_factors: this.getROIRiskFactors(use_case),
      success_factors: this.getROISuccessFactors(use_case)
    };

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(roiAnalysis, null, 2)
      }]
    };
  }

  async assessAIReadiness(args) {
    const { 
      industry, 
      data_maturity = 'intermediate', 
      technical_capabilities = 'moderate',
      leadership_support = 'interested',
      budget_availability = 'moderate'
    } = args;
    
    const readinessScore = this.calculateReadinessScore(data_maturity, technical_capabilities, leadership_support, budget_availability);
    
    const assessment = {
      overall_readiness: {
        score: readinessScore,
        level: this.getReadinessLevel(readinessScore),
        recommendation: this.getReadinessRecommendation(readinessScore)
      },
      dimension_analysis: {
        data_readiness: {
          current_state: data_maturity,
          score: this.getDataScore(data_maturity),
          recommendations: this.getDataRecommendations(data_maturity)
        },
        technical_readiness: {
          current_state: technical_capabilities,
          score: this.getTechnicalScore(technical_capabilities),
          recommendations: this.getTechnicalRecommendations(technical_capabilities)
        },
        organizational_readiness: {
          leadership_support: leadership_support,
          budget_availability: budget_availability,
          score: this.getOrgScore(leadership_support, budget_availability),
          recommendations: this.getOrgRecommendations(leadership_support, budget_availability)
        }
      },
      industry_specific_considerations: this.industryExpertise[industry] || this.industryExpertise.manufacturing,
      recommended_next_steps: this.getReadinessNextSteps(readinessScore, industry),
      timeline_to_readiness: this.getTimelineToReadiness(readinessScore),
      quick_wins: this.getReadinessQuickWins(data_maturity, technical_capabilities)
    };

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(assessment, null, 2)
      }]
    };
  }

  async createBusinessDevelopmentPlan(args) {
    const { target_industries, experience_level, geographic_focus = 'regional', service_offerings } = args;
    
    const plan = {
      business_strategy: {
        target_markets: target_industries,
        service_portfolio: service_offerings,
        geographic_scope: geographic_focus,
        competitive_positioning: this.getCompetitivePositioning(experience_level, service_offerings)
      },
      lead_generation_strategy: {
        primary_channels: this.businessDevelopment.lead_generation,
        content_strategy: this.getContentStrategy(target_industries, experience_level),
        networking_approach: this.getNetworkingApproach(geographic_focus),
        partnership_strategy: this.getPartnershipStrategy(service_offerings)
      },
      sales_process: {
        qualification_criteria: this.businessDevelopment.qualification_criteria,
        sales_stages: this.getSalesStages(service_offerings),
        proposal_templates: this.getProposalTemplates(service_offerings),
        closing_strategies: this.getClosingStrategies(experience_level)
      },
      pricing_strategy: {
        pricing_models: this.businessDevelopment.pricing_strategies,
        rate_recommendations: this.getRateRecommendations(experience_level, service_offerings),
        value_propositions: this.getValuePropositions(target_industries),
        negotiation_guidelines: this.getNegotiationGuidelines(experience_level)
      },
      capacity_planning: {
        initial_targets: this.getInitialTargets(experience_level, geographic_focus),
        scaling_plan: this.getScalingPlan(service_offerings),
        team_expansion: this.getTeamExpansion(service_offerings),
        systems_needed: this.getSystemsNeeded(experience_level)
      },
      success_metrics: {
        lead_metrics: this.getLeadMetrics(),
        sales_metrics: this.getSalesMetrics(service_offerings),
        client_metrics: this.getClientMetrics(),
        financial_metrics: this.getFinancialMetrics(experience_level)
      }
    };

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(plan, null, 2)
      }]
    };
  }

  // Helper methods for calculations and data generation
  calculatePaybackPeriod(investment, currentCost, operatingCost) {
    const annualSavings = currentCost - operatingCost;
    return Math.round((investment / annualSavings) * 12) / 12; // in years
  }

  calculateNPV(investment, currentCost, operatingCost, years, discountRate) {
    const annualSavings = currentCost - operatingCost;
    let npv = -investment;
    
    for (let year = 1; year <= years; year++) {
      npv += annualSavings / Math.pow(1 + discountRate, year);
    }
    
    return Math.round(npv);
  }

  calculateROI(investment, currentCost, operatingCost, years) {
    const totalSavings = (currentCost - operatingCost) * years;
    const roi = ((totalSavings - investment) / investment) * 100;
    return Math.round(roi);
  }

  calculateBreakEven(investment, currentCost, operatingCost) {
    const monthlySavings = (currentCost - operatingCost) / 12;
    return Math.round(investment / monthlySavings); // in months
  }

  calculateReadinessScore(data, technical, leadership, budget) {
    const scores = {
      basic: 1, intermediate: 2, advanced: 3,
      limited: 1, moderate: 2, strong: 3,
      skeptical: 1, interested: 2, committed: 3,
      constrained: 1, flexible: 3
    };
    
    const dataScore = scores[data] || 2;
    const techScore = scores[technical] || 2;
    const leaderScore = scores[leadership] || 2;
    const budgetScore = scores[budget] || 2;
    
    return Math.round(((dataScore + techScore + leaderScore + budgetScore) / 12) * 100);
  }

  getReadinessLevel(score) {
    if (score >= 80) return "High Readiness";
    if (score >= 60) return "Medium Readiness";
    if (score >= 40) return "Low-Medium Readiness";
    return "Low Readiness";
  }

  // Additional helper methods would continue here...
  // Truncated for brevity but would include all referenced methods

  getEngagementChallenges(complexity, companySize) {
    return [
      "Stakeholder alignment across departments",
      "Data quality and availability issues",
      "Change management resistance",
      "Technical integration complexity"
    ];
  }

  getLearningObjectives(consultingType, complexity) {
    return [
      `Understand ${consultingType} consulting methodology`,
      "Practice client communication and stakeholder management",
      "Develop technical proposal writing skills",
      "Learn project scoping and pricing strategies"
    ];
  }
}

async function main() {
  const server = new AIConsultingServer();
  const transport = new StdioServerTransport();
  await server.server.connect(transport);
  console.error('AI Consulting MCP server running on stdio');
}

main().catch(console.error);