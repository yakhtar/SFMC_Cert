# 📊 SFMC Certification Question Banks

## 🎯 Organization Structure

### 📁 **Advanced Level Questions**
- `advanced/advanced_lesson_1_certification_questions.js` - Lesson 1: Advanced subscriber & data management
- `advanced/lesson_2_advanced_certification_questions.js` - Lesson 2: Advanced Contact Builder scenarios  
- `advanced/lesson_3_advanced_certification_questions.js` - Lesson 3: Advanced content creation
- `advanced/lesson_4_advanced_certification_questions.js` - Lesson 4: Advanced testing & delivery
- `advanced/lesson_5_advanced_certification_questions.js` - Lesson 5: Advanced automation
- `advanced/lesson_6_advanced_certification_questions.js` - Lesson 6: Advanced email marketing
- `advanced/lesson_7_advanced_certification_questions.js` - Lesson 7: Advanced tracking & reporting

### 📁 **Intermediate Level Questions**
- `intermediate/lesson_5_comprehensive_certification_questions.js` - Comprehensive Lesson 5 questions

### 📁 **MCP Generated Questions**
- `mcp-generated/Salesforce-Marketing-Cloud-Email-Specialist-intermediate-5q.json` - AI-generated practice questions

### 📁 **Beginner Level Questions**
- Currently integrated directly into lesson files
- Future: Extract from lessons for standalone practice

## 🔧 **Usage Guidelines**

### **For Lesson Integration**
```javascript
// Import questions for specific lesson
import { questions } from './question-banks/advanced/lesson_2_advanced_certification_questions.js';
```

### **For Standalone Practice**
- Advanced questions: Complex scenarios for certification readiness
- Intermediate questions: Comprehensive topic coverage
- MCP-generated: AI-powered adaptive learning

### **For MCP Server Integration**
- All question banks can be loaded by MCP servers
- Supports dynamic difficulty adjustment
- Enables personalized learning paths

## 📈 **Question Bank Statistics**
- **Total Question Files**: 8
- **Advanced Questions**: 7 lessons
- **Intermediate Questions**: 1 comprehensive set
- **MCP Generated**: 1 set (5 questions)
- **Coverage**: Complete SFMC Email Specialist exam topics

## 🎮 **Integration Points**
1. **Interactive Lessons**: Questions loaded directly into lesson interface
2. **MCP Servers**: Dynamic question generation and adaptive learning
3. **Practice Mode**: Standalone question practice outside lessons
4. **Certification Simulator**: Comprehensive exam simulation

---
*Updated: September 2024 | Part of SFMC Certification Learning Platform*