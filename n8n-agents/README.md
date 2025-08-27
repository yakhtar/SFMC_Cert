# AI Agent Hub - N8N Intelligent Agents System

[![N8N](https://img.shields.io/badge/N8N-Cloud-blue)](https://n8n.cloud)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green)](https://openai.com)
[![PWA](https://img.shields.io/badge/PWA-Ready-purple)](https://web.dev/progressive-web-apps/)
[![Mobile](https://img.shields.io/badge/Mobile-Optimized-orange)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

## 🚀 Overview

A comprehensive suite of three intelligent N8N agents designed to provide expert assistance for SQL learning, A/B testing, and restaurant recommendations. Built for independent consultants and businesses looking to leverage AI-powered automation.

### 🎯 Agents Included

1. **📚 SQL Learning Agent**
   - Interactive Q&A from beginner to advanced levels
   - Visual database examples and schema diagrams
   - Real-time query validation and feedback
   - Personalized learning paths

2. **🧪 A/B Test Ideas Agent**
   - Data-driven hypothesis generation
   - Statistical significance calculators (90% & 95%)
   - Sample size and test duration estimation
   - Control vs variation wireframe mockups

3. **🍽️ Restaurant Concierge Agent**
   - Location-based restaurant discovery
   - Dietary restriction filtering
   - Personalized menu recommendations
   - Reservation assistance and party size optimization

## 🌟 Key Features

- **Web + Mobile Optimized**: Responsive design with PWA capabilities
- **Real-time AI Processing**: Powered by OpenAI GPT-4 for intelligent responses
- **Multi-platform Access**: Works on desktop, tablet, and mobile devices
- **Scalable Architecture**: Built on N8N Cloud for enterprise reliability
- **Cost-effective**: ~$70-100/month operating cost for small to medium usage

## 🛠 Technology Stack

- **Backend**: N8N Cloud workflows with webhook triggers
- **AI Engine**: OpenAI GPT-4 for natural language processing
- **Data APIs**: Yelp Fusion API for restaurant data
- **Frontend**: Progressive Web App (PWA) with vanilla JavaScript
- **Deployment**: Netlify/Vercel/GitHub Pages
- **Mobile**: PWA with offline capabilities

## 📱 Access Methods

### Web Interface
- Responsive design works on all devices
- Real-time form validation
- Interactive results display
- Modern UI with accessibility features

### Mobile App (PWA)
- Install directly from browser
- Add to home screen functionality
- Offline UI with cached data
- Native app-like experience

### API Access
Direct webhook integration for custom applications:
```bash
# SQL Learning Agent
POST https://your-instance.app.n8n.cloud/webhook/sql-learning

# A/B Test Ideas Agent  
POST https://your-instance.app.n8n.cloud/webhook/ab-test-ideas

# Restaurant Concierge Agent
POST https://your-instance.app.n8n.cloud/webhook/restaurant-concierge
```

## 🏗 Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Web/Mobile    │───▶│   N8N Cloud      │───▶│   External APIs │
│   Interface     │    │   Workflows      │    │   (OpenAI/Yelp) │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                               │
                       ┌───────┴───────┐
                       │               │
                   ┌───▼───┐       ┌───▼───┐
                   │ SQL   │       │ A/B   │
                   │ Agent │       │ Test  │
                   └───────┘       │ Agent │
                                   └───────┘
                                       │
                                   ┌───▼───┐
                                   │ Rest. │
                                   │ Agent │
                                   └───────┘
```

## 🚀 Quick Start

### Prerequisites
- N8N Cloud account ([Sign up](https://n8n.cloud))
- OpenAI API key ([Get key](https://platform.openai.com/api-keys))
- Yelp Fusion API key ([Get key](https://www.yelp.com/developers/v3/manage_app))

### 5-Minute Setup

1. **Import Workflows**
   ```bash
   # Download the workflow files
   # Import each JSON file to N8N Cloud
   - 01-sql-learning-agent.json
   - 02-ab-test-ideas-agent.json
   - 03-restaurant-concierge-agent.json
   ```

2. **Configure API Keys**
   - Add OpenAI credentials in N8N
   - Add Yelp API credentials in N8N

3. **Deploy Interface**
   ```bash
   # Option 1: Netlify (Drag & Drop)
   # Upload web-mobile-interface.html and manifest.json
   
   # Option 2: GitHub Pages
   git clone this-repo
   # Enable GitHub Pages in settings
   ```

4. **Update Webhook URLs**
   ```javascript
   // In web-mobile-interface.html
   const WEBHOOK_URLS = {
     sql: 'YOUR_N8N_WEBHOOK_URL/sql-learning',
     ab: 'YOUR_N8N_WEBHOOK_URL/ab-test-ideas', 
     restaurant: 'YOUR_N8N_WEBHOOK_URL/restaurant-concierge'
   };
   ```

5. **Test & Go Live** 🎉

## 💡 Use Cases

### For Digital Consultants
- **Client Education**: Teach SQL to data teams
- **CRO Consulting**: Generate A/B test strategies
- **Client Entertainment**: Restaurant recommendations for business meals

### For Businesses
- **Employee Training**: SQL skills development
- **Marketing Teams**: A/B testing ideation
- **Team Building**: Restaurant selection for events

### For Individuals
- **Personal Learning**: Master SQL at your own pace
- **Side Projects**: A/B testing for personal apps
- **Social Planning**: Find perfect dining spots

## 📊 Example Interactions

### SQL Learning Agent
```json
{
  "action": "generate_question",
  "difficulty": "intermediate", 
  "topic": "JOINs"
}
```
**Response**: Interactive SQL question with sample data and expected query

### A/B Test Ideas Agent
```json
{
  "action": "calculate_stats",
  "baselineRate": "2.5",
  "expectedLift": "20",
  "monthlyTraffic": "50000"
}
```
**Response**: Sample size (1,234 per variation), Duration (14 days), Confidence intervals

### Restaurant Concierge Agent  
```json
{
  "action": "get_recommendations",
  "location": "San Francisco, CA",
  "cuisine": "italian",
  "dietaryRequirements": ["vegetarian"],
  "partySize": "4"
}
```
**Response**: Top 10 restaurants with ratings, menus, and dietary compatibility

## 📈 Analytics & Monitoring

- **N8N Dashboard**: Execution history and performance metrics
- **OpenAI Usage**: Token consumption and cost tracking  
- **Yelp API**: Daily request quota monitoring
- **Web Analytics**: User engagement and feature usage

## 💰 Cost Breakdown

| Service | Monthly Cost | Usage |
|---------|-------------|-------|
| N8N Cloud Pro | $50 | 50 workflows, 25K executions |
| OpenAI API | $20-50 | ~50K tokens (varies by usage) |
| Yelp API | Free | 5K requests/day |
| Hosting | Free | Netlify/GitHub Pages |
| **Total** | **$70-100** | For small-medium usage |

## 🔒 Security Features

- **API Key Protection**: Secured in N8N credential management
- **CORS Configuration**: Restricts unauthorized access
- **Rate Limiting**: Prevents API abuse
- **HTTPS Only**: All communications encrypted
- **No Data Storage**: Privacy-first approach

## 🎨 Customization Options

### White-label for Clients
- Custom branding and colors
- Client domain deployment
- Personalized agent names

### Feature Extensions
- **Voice Integration**: Speech-to-text for mobile
- **Multi-language Support**: Translate interfaces
- **Advanced Analytics**: Usage dashboards
- **Team Features**: Shared learning progress

## 🚨 Troubleshooting

### Common Issues
1. **Webhook 404**: Check N8N workflow activation
2. **API Errors**: Verify credentials and usage limits
3. **Mobile Install**: Ensure HTTPS and PWA manifest
4. **Slow Responses**: Check API quotas and timeout settings

See `deployment-guide.md` for detailed troubleshooting steps.

## 📚 Documentation

- [`deployment-guide.md`](./deployment-guide.md) - Complete setup instructions
- [`web-mobile-interface.html`](./web-mobile-interface.html) - Frontend application
- [`01-sql-learning-agent.json`](./01-sql-learning-agent.json) - SQL agent workflow
- [`02-ab-test-ideas-agent.json`](./02-ab-test-ideas-agent.json) - A/B test agent workflow
- [`03-restaurant-concierge-agent.json`](./03-restaurant-concierge-agent.json) - Restaurant agent workflow

## 🤝 Contributing

We welcome contributions! Areas for improvement:
- Additional SQL question types
- New A/B testing frameworks
- Restaurant API integrations
- UI/UX enhancements
- Mobile features

## 📄 License

MIT License - Feel free to use for personal and commercial projects.

## 🎯 Roadmap

- [ ] **Q1 2024**: Voice interface integration
- [ ] **Q2 2024**: Team collaboration features  
- [ ] **Q3 2024**: Enterprise dashboard
- [ ] **Q4 2024**: AI agent marketplace

---

## 🚀 Get Started Today!

1. **Clone this repository**
2. **Follow the deployment guide**
3. **Launch your AI agents in under 3 hours**
4. **Start helping users learn, test, and dine smarter**

**Ready to revolutionize how people interact with data, optimization, and dining?** 

[🚀 Start Your Deployment Now](./deployment-guide.md)

---

*Built with ❤️ for independent digital consultants who want to deliver intelligent, scalable solutions to their clients.*