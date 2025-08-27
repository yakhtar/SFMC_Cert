# N8N AI Agents Deployment Guide

## Overview
Complete deployment guide for three intelligent N8N agents:
- **SQL Learning Agent**: Interactive SQL education with Q&A and visual examples
- **A/B Test Ideas Agent**: Hypothesis generation with statistical calculators and wireframes
- **Restaurant Concierge Agent**: Personalized dining recommendations with dietary filtering

## Prerequisites

### N8N Cloud Account Setup
1. **Sign up for N8N Cloud**: [https://n8n.cloud](https://n8n.cloud)
2. **Choose appropriate plan**:
   - Starter: $20/month (5 workflows, 2,500 executions)
   - Pro: $50/month (50 workflows, 25,000 executions) - **Recommended**
   - Scale: $500/month (Unlimited workflows/executions)

### Required API Keys and Credentials
1. **OpenAI API Key** (Required for all agents)
   - Visit: https://platform.openai.com/api-keys
   - Cost: ~$0.002 per 1K tokens (GPT-4)
   
2. **Yelp Fusion API** (Required for Restaurant Concierge)
   - Visit: https://www.yelp.com/developers/v3/manage_app
   - Free: 5,000 API calls/day

3. **Optional APIs for Enhancement**:
   - Google Places API (Better restaurant data)
   - Unsplash API (Visual content for SQL examples)

## Step 1: Import Workflows to N8N Cloud

### 1.1 Access N8N Cloud Dashboard
- Log into your N8N Cloud account
- Navigate to "Workflows" section

### 1.2 Import Each Agent Workflow
For each agent (3 total):

1. **Click "Import from URL" or "Import from JSON"**
2. **Upload the respective JSON file**:
   - `01-sql-learning-agent.json`
   - `02-ab-test-ideas-agent.json`  
   - `03-restaurant-concierge-agent.json`

3. **Configure Credentials** (see Section 2)
4. **Test webhook endpoints** (see Section 3)

## Step 2: Configure API Credentials

### 2.1 OpenAI Credential Setup
1. In N8N, go to **Settings → Credentials**
2. **Create new credential** → "OpenAI"
3. **Add your OpenAI API key**
4. **Name it**: `openai-main`
5. **Test connection**

### 2.2 Yelp API Credential Setup
1. **Create new credential** → "Yelp API"
2. **Add your Yelp API key**
3. **Name it**: `yelp-restaurants`
4. **Test connection**

### 2.3 Update Workflow Credentials
For each imported workflow:
1. **Open workflow in editor**
2. **Click on nodes that require credentials**:
   - OpenAI nodes → Select `openai-main`
   - HTTP Request nodes (Yelp) → Select `yelp-restaurants`
3. **Save workflow**

## Step 3: Configure Webhook URLs

### 3.1 Get Webhook URLs from N8N
For each workflow:
1. **Click on the "Webhook" trigger node**
2. **Copy the webhook URL** (format: `https://[your-instance].app.n8n.cloud/webhook/[path]`)
3. **Note the webhook URLs**:
   - SQL Agent: `/webhook/sql-learning`
   - A/B Test Agent: `/webhook/ab-test-ideas`
   - Restaurant Agent: `/webhook/restaurant-concierge`

### 3.2 Update Frontend Configuration
In `web-mobile-interface.html`, update the `WEBHOOK_URLS` object:

```javascript
const WEBHOOK_URLS = {
    sql: 'https://your-instance.app.n8n.cloud/webhook/sql-learning',
    ab: 'https://your-instance.app.n8n.cloud/webhook/ab-test-ideas',
    restaurant: 'https://your-instance.app.n8n.cloud/webhook/restaurant-concierge'
};
```

## Step 4: Deploy Web Interface

### Option A: Quick Deploy (Netlify - Free)
1. **Create account**: https://netlify.com
2. **Drag & drop** the folder containing:
   - `web-mobile-interface.html` (rename to `index.html`)
   - `manifest.json`
3. **Deploy instantly** - Get live URL

### Option B: GitHub Pages (Free)
1. **Create GitHub repository**
2. **Upload files**:
   ```
   /your-repo
   ├── index.html (renamed from web-mobile-interface.html)
   ├── manifest.json
   └── README.md
   ```
3. **Enable GitHub Pages** in repository settings
4. **Access via**: `https://username.github.io/repository-name`

### Option C: Vercel (Free)
1. **Connect GitHub repo** to Vercel
2. **Auto-deploy** on commits
3. **Custom domain** support

## Step 5: Testing & Validation

### 5.1 Test Each Agent Individually

#### SQL Learning Agent Test
```bash
curl -X POST https://your-instance.app.n8n.cloud/webhook/sql-learning \
  -H "Content-Type: application/json" \
  -d '{
    "action": "generate_question",
    "difficulty": "beginner",
    "topic": "SELECT statements"
  }'
```

#### A/B Test Agent Test
```bash
curl -X POST https://your-instance.app.n8n.cloud/webhook/ab-test-ideas \
  -H "Content-Type: application/json" \
  -d '{
    "action": "generate_hypothesis",
    "industry": "e-commerce",
    "goal": "increase conversions",
    "currentRate": "2.5",
    "traffic": "10000"
  }'
```

#### Restaurant Concierge Test
```bash
curl -X POST https://your-instance.app.n8n.cloud/webhook/restaurant-concierge \
  -H "Content-Type: application/json" \
  -d '{
    "action": "get_recommendations",
    "location": "New York, NY",
    "cuisine": "italian",
    "partySize": "2",
    "dietaryRequirements": ["vegetarian"]
  }'
```

### 5.2 Web Interface Testing
1. **Open deployed web interface**
2. **Test each agent** through the UI
3. **Verify mobile responsiveness**
4. **Check PWA installation**

## Step 6: Mobile Access Setup

### 6.1 Progressive Web App (PWA)
- Users can **install the app** from mobile browsers
- **Add to Home Screen** functionality
- **Offline capabilities** (basic UI)

### 6.2 SMS Integration (Optional Enhancement)
Add SMS webhook to receive restaurant recommendations:

```javascript
// Add to N8N workflow
{
  "nodes": [
    {
      "name": "SMS Notification",
      "type": "n8n-nodes-base.twilio",
      "parameters": {
        "message": "🍽️ Found {{$json.restaurants.length}} restaurants for you! Check the app for details."
      }
    }
  ]
}
```

### 6.3 WhatsApp Integration (Advanced)
- Use **Twilio WhatsApp API**
- Send rich restaurant cards
- Interactive menu selections

## Step 7: Monitoring & Analytics

### 7.1 N8N Execution Analytics
- **View execution history** in N8N dashboard
- **Monitor API costs** and usage
- **Set up alerts** for failed executions

### 7.2 Usage Analytics
Add Google Analytics to web interface:

```html
<!-- Add to <head> section -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
  
  // Track agent usage
  function trackAgentUsage(agentType) {
    gtag('event', 'agent_usage', {
      'agent_type': agentType,
      'event_category': 'engagement'
    });
  }
</script>
```

## Step 8: Security & Performance

### 8.1 Security Best Practices
1. **API Key Protection**:
   - Never expose keys in frontend code
   - Use N8N credential management
   - Rotate keys quarterly

2. **Rate Limiting**:
   - Implement request throttling
   - Monitor for abuse

3. **CORS Configuration**:
   ```javascript
   // In N8N webhook response
   {
     "headers": {
       "Access-Control-Allow-Origin": "https://yourdomain.com",
       "Access-Control-Allow-Methods": "POST, OPTIONS",
       "Access-Control-Allow-Headers": "Content-Type"
     }
   }
   ```

### 8.2 Performance Optimization
1. **Caching Strategy**:
   - Cache restaurant data for 1 hour
   - Cache SQL question types
   - Use browser localStorage

2. **Response Time Optimization**:
   - Async processing for long-running tasks
   - Webhook timeouts: 30 seconds max
   - Progress indicators in UI

## Step 9: Cost Management

### 9.1 Monthly Cost Estimates
- **N8N Pro Plan**: $50/month
- **OpenAI API**: $20-50/month (depending on usage)
- **Yelp API**: Free (5K calls/day)
- **Hosting**: Free (Netlify/GitHub Pages)
- **Total**: ~$70-100/month

### 9.2 Cost Optimization Tips
1. **Use GPT-3.5-turbo** for simple tasks (10x cheaper)
2. **Implement response caching**
3. **Set usage alerts** in OpenAI dashboard
4. **Monitor N8N execution counts**

## Step 10: Scaling & Enhancement

### 10.1 User Management (Future)
- Add user authentication
- Track learning progress
- Personalized recommendations

### 10.2 Additional Features
- **Voice Integration**: Add speech-to-text for mobile
- **Multi-language**: Translate interfaces
- **Social Features**: Share A/B test results
- **Integrations**: Connect to Google Sheets, Slack

### 10.3 Enterprise Features
- **White-label** for clients
- **Custom branding**
- **Advanced analytics dashboard**
- **Team collaboration tools**

## Troubleshooting Guide

### Common Issues & Solutions

#### 1. Webhook Not Working
- **Check N8N workflow status** (active/inactive)
- **Verify webhook URL** in frontend
- **Test with curl** commands above

#### 2. OpenAI API Errors
- **Check API key validity**
- **Monitor usage limits**
- **Verify billing status**

#### 3. Restaurant Data Missing
- **Check Yelp API key**
- **Verify location parameter**
- **Test API directly**: https://api.yelp.com/v3/businesses/search

#### 4. Mobile App Not Installing
- **Check manifest.json** syntax
- **Verify HTTPS** deployment
- **Test PWA criteria**: https://web.dev/pwa-checklist/

## Support & Maintenance

### Regular Maintenance Tasks
- **Weekly**: Check execution logs
- **Monthly**: Review API usage and costs
- **Quarterly**: Update dependencies and API keys
- **Annually**: Review and optimize workflows

### Getting Help
1. **N8N Community**: https://community.n8n.io
2. **OpenAI Support**: https://platform.openai.com/docs
3. **GitHub Issues**: Create issues for bug reports

---

## Quick Start Checklist

- [ ] N8N Cloud account created
- [ ] OpenAI API key obtained
- [ ] Yelp API key obtained  
- [ ] All 3 workflows imported to N8N
- [ ] Credentials configured in N8N
- [ ] Webhook URLs updated in frontend
- [ ] Web interface deployed
- [ ] Each agent tested successfully
- [ ] Mobile access verified
- [ ] Analytics configured
- [ ] Cost monitoring set up

**Estimated Setup Time**: 2-3 hours
**Go-Live Timeline**: Same day deployment possible

Your intelligent AI agent system is now ready to help users learn SQL, create A/B tests, and discover perfect restaurants! 🚀