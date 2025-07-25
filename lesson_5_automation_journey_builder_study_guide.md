# SFMC Certification Study Guide
## Lesson 5: Automation & Journey Builder

### What You'll Learn (Like You're in 5th Grade!)

Hey there, future SFMC automation expert! 🤖 Today we're learning about automation and Journey Builder - it's like teaching your computer to be your super smart assistant that can send emails and do marketing tasks while you sleep!

Think of automation like setting up a chain of dominoes. Once you push the first domino (trigger), all the other dominoes fall in order (your automated actions). Journey Builder is like creating a choose-your-own-adventure story for your customers, where they take different paths based on what they do!

---

### 🤖 **What is Marketing Automation?**

**Think of automation like a helpful robot assistant!** Marketing automation is when you set up your computer to do marketing tasks automatically, without you having to do them manually every time.

**Real-Life Example:**
- When someone signs up for your newsletter, automation can automatically send them a welcome email
- Like having a doorbell that automatically plays music when someone visits your house!

**Types of Automation in SFMC:**
1. **Triggered Sends** - Emails sent when something specific happens
2. **Journey Builder** - Multi-step customer experiences  
3. **Automation Studio** - Behind-the-scenes data processing
4. **Import Activities** - Automatically bringing in new data

---

### 🛠️ **Automation Studio: Your Behind-the-Scenes Helper**

**What is Automation Studio?**
Automation Studio is like the backstage crew at a theater - you don't see them, but they make everything work smoothly by handling data, imports, and other technical tasks.

**Key Activities in Automation Studio:**
- **Import Activity** - Bringing customer data into SFMC (like uploading a class roster)
- **Query Activity** - Finding specific customers using SQL (like searching your contact list)
- **Data Copy Activity** - Moving data from one place to another
- **Filter Activity** - Creating groups of customers based on rules

**Step-by-Step: Creating a Basic Automation**
1. Go to Automation Studio
2. Click "New Automation"
3. Give it a name (like "Daily Customer Import")
4. Drag activities from the left panel to create your workflow
5. Connect activities with arrows to show the order
6. Set a schedule (daily, weekly, etc.)
7. Activate your automation

---

### 🗺️ **Journey Builder: Creating Customer Adventures**

**What is Journey Builder?**
Journey Builder is like creating a map for your customers' experiences. It's where you design the path customers take based on their actions and preferences.

**Think of it like a board game:**
- Customers start at "Go"
- Based on what they do (open email, click link, make purchase), they move to different spaces
- Each space has different activities (send email, wait, check conditions)

**Types of Journeys:**
1. **Single Send Journey** - One-time email blast
2. **Multi-Step Journey** - Series of emails and activities over time
3. **Event-Triggered Journey** - Starts when specific actions happen

---

### 📧 **Single Send Journey: Your Quick Email Blast**

**What is a Single Send Journey?**
A Single Send Journey is like sending one announcement to your whole class - everyone gets the same message at the same time.

**When to Use Single Send:**
- Flash sales or promotions
- Newsletter broadcasts
- Event announcements
- Holiday greetings

**Step-by-Step: Creating a Single Send Journey**
1. Go to Journey Builder
2. Click "Create New Journey"
3. Choose "Single Send Journey"
4. Select your audience (like picking which class gets the announcement)
5. Choose your email template
6. Set when to send (now or scheduled)
7. Review and activate

---

### 🛤️ **Multi-Step Journeys: The Customer Adventure Path**

**What is a Multi-Step Journey?**
A Multi-Step Journey is like a series of connected adventures. Customers move from one step to the next based on what they do or don't do.

**Journey Components:**
- **Entry Source** - How customers enter (like the starting gate)
- **Activities** - Actions taken (send email, wait, check data)
- **Decision Splits** - Where customers can take different paths
- **Goals** - What you want customers to achieve
- **Exit Criteria** - When customers leave the journey

**Step-by-Step: Building a Welcome Journey**
1. **Set Entry Source** - New subscribers from a data extension
2. **Welcome Email** - Send immediately when they enter
3. **Wait Activity** - Wait 3 days
4. **Decision Split** - Did they open the welcome email?
   - If YES: Send product recommendations
   - If NO: Send different email with special offer
5. **Goal** - Make a purchase within 30 days

---

### ⚙️ **Journey Settings & Configuration**

**Journey Settings - Like Setting Up Game Rules**

**Contact Entry Settings:**
- **No re-entry** - Customers can only go through once (like a one-time ride)
- **Re-entry only after exiting** - Can go through again only after completing
- **Re-entry anytime** - Can enter multiple times

**Email Settings:**
- Choose your send classification (who emails come from)
- Set publication lists (how customers can unsubscribe)
- Configure delivery options

**Goals - Your Journey Success Metrics**
Goals are like setting a target for what you want customers to do:
- Make a purchase
- Open a certain number of emails
- Visit your website
- Sign up for an event

---

### 🕐 **Wait Activities: Perfect Timing**

**What are Wait Activities?**
Wait activities are like red lights in your journey - they pause customers for a specific amount of time before the next step.

**Types of Wait:**
- **Wait by Duration** - Wait specific time (3 days, 1 week)
- **Wait by Date/Time** - Wait until specific date
- **Wait by Attribute** - Wait until customer data changes

**Best Practices for Wait Times:**
- **Welcome Series**: Wait 2-3 days between emails
- **Abandoned Cart**: Wait 1 hour, then 24 hours, then 3 days
- **Educational Series**: Wait 1 week between lessons
- **Holiday Campaigns**: Wait until specific dates

---

### 🎯 **Decision Splits: Choose Your Own Adventure**

**What are Decision Splits?**
Decision Splits are like forks in the road where customers take different paths based on their behavior or information.

**Types of Decision Splits:**
1. **Engagement Split** - Based on email opens/clicks
2. **Attribute Split** - Based on customer data (age, location, preferences)
3. **Random Split** - Randomly divide customers (for A/B testing)

**Example: Email Engagement Split**
- **Path A (Opened Email)**: Send product catalog
- **Path B (Didn't Open)**: Send with different subject line
- **Path C (Clicked Link)**: Send discount offer

---

### 📊 **Data Extensions & Entry Sources**

**Entry Sources - The Starting Gate**
Entry Sources determine how and when customers enter your journey:

**Types of Entry Sources:**
- **Data Extension** - Customers from a specific list
- **Salesforce Object** - Data from Salesforce CRM
- **API Event** - Triggered by external systems
- **Audience Builder** - From filtered audiences

**Data Extension Entry:**
- Schedule when to check for new records
- Choose evaluation frequency (once, daily, hourly)
- Set contact evaluation (add only new records vs. all records)

---

### 🔧 **Automation Activities Deep Dive**

**Import Activity - Bringing Data In**
Like uploading your contact list into your phone:
1. Choose data source (FTP, local file, etc.)
2. Map columns to SFMC fields
3. Set import options (add new, update existing, overwrite all)
4. Choose target data extension

**Query Activity - Finding Specific Customers**
Using SQL to find customers who meet certain criteria:
```sql
SELECT CustomerID, EmailAddress, FirstName
FROM Subscribers 
WHERE OptInDate >= DATEADD(DAY, -7, GETDATE())
```

**Filter Activity - Creating Customer Segments**
Like sorting your music by genre:
- Create rules (age > 25, location = California)
- Combine multiple conditions (age > 25 AND interested in camping)
- Save results to new data extension

---

### 🎪 **Journey Validation & Testing**

**Before You Launch - The Safety Check**
Always validate your journey before activating:

**Validation Checklist:**
- ✅ All activities properly connected
- ✅ Email content approved and tested
- ✅ Data extensions have correct fields
- ✅ Entry source properly configured
- ✅ Wait times are reasonable
- ✅ Decision splits have all paths covered
- ✅ Goals properly set up

**Testing Your Journey:**
1. Create test data extension with sample contacts
2. Use "Test Journey" mode
3. Monitor test contacts through each step
4. Check email deliverability and content
5. Verify timing of wait activities

---

### 📈 **Journey Analytics & Reporting**

**Understanding Journey Performance**
Like checking your report card to see how well you did:

**Key Journey Metrics:**
- **Entry Count** - How many customers entered
- **Exit Count** - How many customers left early
- **Goal Achievement** - How many reached your target
- **Activity Performance** - How each step performed
- **Conversion Rates** - Percentage completing each step

**Path Performance:**
- Which decision split paths perform best
- Where customers drop out most often
- Time spent in each activity
- Overall journey completion rate

---

### 🏆 **Best Practices for Journey Builder**

**Planning Your Journey:**
1. **Start with Goals** - Know what success looks like
2. **Map Customer Experience** - Think like your customer
3. **Keep It Simple** - Don't overcomplicate paths
4. **Test Small** - Start with a small audience
5. **Monitor Performance** - Check results regularly

**Email Timing Best Practices:**
- **Welcome emails**: Send immediately
- **Educational content**: Space 3-7 days apart
- **Promotional emails**: Don't overwhelm (max 2-3 per week)
- **Abandoned cart**: 1 hour, 24 hours, 3 days, 1 week

**Journey Maintenance:**
- Review performance monthly
- Update content seasonally
- Refresh data extensions regularly
- Archive completed journeys
- Document journey purposes and changes

---

### 🎓 **Key Terms to Remember**

- **Automation**: Automated marketing tasks that run without manual intervention
- **Journey Builder**: Tool for creating multi-step customer experiences
- **Entry Source**: How customers enter a journey
- **Decision Split**: Point where customers take different paths
- **Wait Activity**: Pause in journey for specified time
- **Goal**: Target action you want customers to complete
- **Data Extension**: Table storing customer information
- **Query Activity**: SQL-based customer selection
- **Single Send**: One-time email to entire audience
- **Multi-Step Journey**: Series of connected activities over time

---

### 💡 **Pro Tips for Success**

1. **Think Like Your Customer** - Put yourself in their shoes
2. **Start Simple** - Build complexity gradually
3. **Test Everything** - Always test before going live
4. **Monitor Performance** - Check results and optimize
5. **Keep Content Fresh** - Update emails regularly
6. **Respect Frequency** - Don't overwhelm customers
7. **Plan for Edge Cases** - What if someone doesn't respond?
8. **Document Everything** - Keep notes on journey purposes

---

### 📝 **Practice Questions**

**1. What's the main difference between Automation Studio and Journey Builder?**
A) Automation Studio is for emails, Journey Builder is for data
B) Automation Studio handles backend processes, Journey Builder manages customer experiences  
C) They do the same thing
D) Journey Builder is more advanced

**Answer: B) Automation Studio handles backend processes, Journey Builder manages customer experiences**
*Explanation: Automation Studio works behind the scenes with data and technical tasks, while Journey Builder creates customer-facing experiences.*

**2. What is an Entry Source in Journey Builder?**
A) The exit point of a journey
B) How customers enter the journey
C) The email template used
D) The goal of the journey

**Answer: B) How customers enter the journey**
*Explanation: Entry Source determines which customers enter the journey and when they enter.*

**3. What should you do before activating a journey?**
A) Send it to all customers immediately
B) Wait a week to think about it
C) Validate and test the journey
D) Only check the spelling

**Answer: C) Validate and test the journey**
*Explanation: Always validate connections, test with sample data, and verify all components work properly.*

**4. What is a Decision Split used for?**
A) Ending the journey
B) Creating different paths based on customer behavior or data
C) Scheduling emails
D) Importing data

**Answer: B) Creating different paths based on customer behavior or data**
*Explanation: Decision Splits allow customers to take different journey paths based on their actions or information.*

**5. How long should you wait between emails in a welcome series?**
A) Send all emails immediately
B) Wait 2-3 days between emails
C) Wait 1 month between emails
D) Send randomly

**Answer: B) Wait 2-3 days between emails**
*Explanation: This gives customers time to engage without being overwhelming, and maintains interest.*

**6. What is a Query Activity used for?**
A) Asking customers questions
B) Finding specific customers using SQL
C) Sending emails
D) Creating templates

**Answer: B) Finding specific customers using SQL**
*Explanation: Query Activities use SQL to select customers who meet specific criteria from your data.*

**7. What does "No re-entry" mean in Journey Settings?**
A) Customers can enter multiple times
B) Customers can only go through the journey once
C) No customers can enter
D) Only new customers can enter

**Answer: B) Customers can only go through the journey once**
*Explanation: This setting prevents customers from going through the same journey multiple times.*

**8. What is the purpose of a Wait Activity?**
A) To end the journey
B) To pause customers for a specific time before the next step
C) To send emails faster
D) To collect customer data

**Answer: B) To pause customers for a specific time before the next step**
*Explanation: Wait Activities create timing delays between journey steps for better customer experience.*

**9. What should you check in Journey Analytics?**
A) Only the number of emails sent
B) Entry count, goal achievement, and path performance
C) Just the email design
D) Only bounce rates

**Answer: B) Entry count, goal achievement, and path performance**
*Explanation: These metrics give you a complete picture of journey effectiveness and customer behavior.*

**10. What's the best practice for abandoned cart email timing?**
A) Send immediately only
B) Send after 1 hour, 24 hours, 3 days, and 1 week
C) Wait 1 month before sending
D) Never send abandoned cart emails

**Answer: B) Send after 1 hour, 24 hours, 3 days, and 1 week**
*Explanation: This timing sequence catches customers at different stages of decision-making without being too aggressive.*

---

**🎉 Congratulations!** You now understand automation and Journey Builder like a pro! Remember, automation is about creating helpful, timely experiences for your customers. Start simple, test everything, and always think about what would be most valuable for the people receiving your emails.

The key to successful automation is treating it like you're helping a friend - be helpful, not annoying, and always provide value. Keep practicing these concepts, and you'll be creating amazing customer journeys in no time! 🚀