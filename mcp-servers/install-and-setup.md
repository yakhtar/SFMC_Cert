# MCP Servers for Certification Study Guide Creation

## Installation and Setup Guide

### Prerequisites

1. **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
2. **Git** - For version control
3. **Claude Desktop** or **MCP-compatible client**

### Quick Installation

```bash
# Navigate to your project directory
cd /path/to/your/project/mcp-servers

# Install dependencies
npm run setup

# This will:
# - Install all required packages
# - Create necessary directories
# - Set up the MCP server structure
```

### Manual Installation Steps

```bash
# 1. Install Node.js dependencies
npm install

# 2. Create required directories
mkdir -p certification-research question-banks quiz-data analytics
mkdir -p quiz-data/sessions certification-tracking

# 3. Set permissions (Unix/Mac)
chmod +x *.js

# 4. Test MCP servers
node certification-research-mcp.js --test
node question-generator-mcp.js --test
node quiz-engine-mcp.js --test
```

## MCP Server Configuration

### 1. Add to Claude Desktop Configuration

Add these servers to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "certification-research": {
      "command": "node",
      "args": ["C:\\path\\to\\your\\project\\mcp-servers\\certification-research-mcp.js"],
      "env": {
        "NODE_PATH": "C:\\path\\to\\your\\project\\mcp-servers\\node_modules"
      }
    },
    "question-generator": {
      "command": "node", 
      "args": ["C:\\path\\to\\your\\project\\mcp-servers\\question-generator-mcp.js"],
      "env": {
        "NODE_PATH": "C:\\path\\to\\your\\project\\mcp-servers\\node_modules"
      }
    },
    "quiz-engine": {
      "command": "node",
      "args": ["C:\\path\\to\\your\\project\\mcp-servers\\quiz-engine-mcp.js"],
      "env": {
        "NODE_PATH": "C:\\path\\to\\your\\project\\mcp-servers\\node_modules"
      }
    }
  }
}
```

### 2. Restart Claude Desktop

After adding the configuration, restart Claude Desktop to load the MCP servers.

## Usage Examples

### Research a Certification

```json
{
  "tool": "research_certification",
  "parameters": {
    "certificationName": "Oracle 1Z0-071",
    "vendor": "oracle",
    "includeObjectives": true
  }
}
```

### Generate Question Bank

```json
{
  "tool": "generate_question_bank",
  "parameters": {
    "certificationName": "AWS Solutions Architect Associate",
    "certificationDomain": "cloud",
    "difficulty": "intermediate", 
    "questionCount": 50,
    "businessSectors": ["technology", "healthcare", "finance"]
  }
}
```

### Create Quiz Session

```json
{
  "tool": "create_quiz_session",
  "parameters": {
    "userId": "user123",
    "certificationName": "Microsoft DP-300",
    "difficulty": "adaptive",
    "questionCount": 30,
    "timeLimit": 60
  }
}
```

## Features Overview

### 🔍 Certification Research MCP
- **Auto-scrapes** certification sites for official content
- **Extracts syllabus** and exam objectives
- **Tracks certification changes** over time
- **Generates study outlines** based on available time

### 📝 Question Generator MCP  
- **Creates realistic business scenarios** for questions
- **Generates multiple choice questions** with detailed explanations
- **Maintains question quality** through validation
- **Supports multiple certification types** and difficulty levels

### 🎯 Quiz Engine MCP
- **Adaptive difficulty** based on performance
- **Real-time analytics** and progress tracking
- **Comprehensive reporting** and insights
- **Session management** with time tracking

## Directory Structure

```
mcp-servers/
├── certification-research-mcp.js    # Research automation
├── question-generator-mcp.js        # Question creation
├── quiz-engine-mcp.js              # Quiz management
├── package.json                     # Dependencies
├── install-and-setup.md            # This file
└── data/                           # Generated data
    ├── certification-research/      # Research results
    ├── question-banks/             # Generated questions
    ├── quiz-data/                  # Session data
    └── analytics/                  # Performance reports
```

## Advanced Configuration

### Environment Variables

Create a `.env` file for configuration:

```env
# API Keys (if needed for web scraping)
OPENAI_API_KEY=your-key-here
SCRAPING_API_KEY=your-key-here

# Data directories
RESEARCH_DIR=./certification-research
QUESTION_BANK_DIR=./question-banks
QUIZ_DATA_DIR=./quiz-data

# Performance settings
MAX_CONCURRENT_SESSIONS=10
QUESTION_CACHE_SIZE=1000
ANALYTICS_RETENTION_DAYS=365
```

### Custom Business Contexts

Edit the `businessContexts` object in `question-generator-mcp.js` to add your own company scenarios:

```javascript
this.businessContexts = {
  yourIndustry: [
    "YourCompany Corp", "CustomBusiness Inc", "SpecializedTech Solutions"
  ]
};
```

## Troubleshooting

### Common Issues

1. **MCP Server not connecting**
   - Check file paths in `claude_desktop_config.json`
   - Verify Node.js is installed correctly
   - Restart Claude Desktop

2. **Missing dependencies**
   ```bash
   npm install --force
   ```

3. **Permission denied (Unix/Mac)**
   ```bash
   chmod +x *.js
   ```

4. **Port conflicts**
   - MCP servers use stdio by default (no ports)
   - If using HTTP mode, check for port conflicts

### Debug Mode

Run servers in debug mode:

```bash
DEBUG=true node certification-research-mcp.js
```

### Log Files

Check logs in:
- `./logs/certification-research.log`
- `./logs/question-generator.log`
- `./logs/quiz-engine.log`

## Performance Optimization

### For Large Question Banks (1000+ questions)

1. **Enable caching**:
   ```javascript
   const ENABLE_CACHING = true;
   const CACHE_SIZE = 1000;
   ```

2. **Use database storage** instead of JSON files for better performance

3. **Implement pagination** for large result sets

### Memory Management

```javascript
// In package.json scripts
"start:production": "node --max-old-space-size=4096 certification-research-mcp.js"
```

## Integration Examples

### With Existing Study Platforms

```javascript
// Example integration with your study platform
const mcpClient = new MCPClient();

// Research certification
const certData = await mcpClient.call('research_certification', {
  certificationName: 'Oracle 1Z0-071',
  vendor: 'oracle'
});

// Generate questions
const questions = await mcpClient.call('generate_question_bank', {
  certificationName: 'Oracle 1Z0-071',
  certificationDomain: 'sql',
  difficulty: 'intermediate',
  questionCount: 100
});

// Create adaptive quiz
const session = await mcpClient.call('create_quiz_session', {
  userId: getCurrentUserId(),
  certificationName: 'Oracle 1Z0-071',
  difficulty: 'adaptive'
});
```

## Next Steps

1. **Test the basic setup** with one certification
2. **Customize business contexts** for your domain
3. **Add more certification sources** to the research MCP
4. **Integrate with your existing tools**
5. **Scale up** question generation for production use

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the MCP documentation
3. Test with debug mode enabled
4. Check log files for detailed error messages

## License

MIT License - Use and modify as needed for your certification projects.