🧠 QCM Medical Platform — Functional Specification (v4)

👤 USER FUNCTIONALITIES
1. Profile & Roles
User Profile includes:

Name
Email address
Profile picture (uploadable)
Role (Admin or Simple User)
Join date
Active plan (derived from activation code)

Two role types:

Admin: Full management and moderation capabilities
Simple User: Standard learning and interaction capabilities


2. Core Actions
Users can perform the following actions on QCMs:

Comment: Add comments and reply to existing comments on any QCM
Vote on Comments: Upvote or downvote comments from other users
Report: Flag QCMs for review by administrators
Add to Playlists: Organize QCMs into custom playlists (e.g., "Cardiology Playlist", "Difficult Questions")
Create Notes: Write personal notes linked to specific QCMs (e.g., "Cardio Notes")
Add to "Last Look": Add QCMs to a default revision list for final review before exams
Submit to Team: Send QCMs to the platform team to suggest new questions or corrections


3. History & Progress Tracking
Activity History:

Last 10 lessons visited (with exact timestamp: date, hour, minute)
Last 5 modules accessed
Last study time per lesson/module displayed (e.g., "Last studied: 19 Jan 2025, 14:30")

Layer System (Couches):
The platform uses a layer-based learning system where each "layer" represents a complete attempt cycle through the material.
How it works:

Users answer QCMs within a layer
QCMs cannot be re-answered within the same layer once answered
Users can initiate a Reset/New Layer at any time

When starting a new layer:

All previously answered QCMs become available to answer again
All unanswered QCMs carry over to the new layer
Before the reset, users can review their previous layer performance:

View their chosen answers for each QCM
Compare with correct answers
See explanations



Layer Statistics:

Each layer maintains its own performance record
When changing layers, users see a layer summary bar showing:

✅ Correct answers (green)
⚠️ Partial answers (orange)
❌ Incorrect answers (red)


This summary is displayed for each lesson within that layer
Layer statistics are preserved and can be reviewed later


4. QCM Interaction & Learning Flow
Answering QCMs:

Users select answers from multiple choice options
Once submitted, the answer cannot be changed within the same layer
If answered incorrectly: QCM is automatically added to the "Revision" playlist
If answered correctly: QCM is marked as mastered in current layer

Re-answering QCMs:

Only possible by starting a new layer (see Layer System above)

Personalized Exams:

Users can create custom exam sets by selecting specific QCMs
Save custom exams with a name for future access
Retrieve and retake saved exams at any time

Dashboard Activity Sorting:

When a user answers a QCM in a lesson, that lesson automatically moves to the top of their dashboard
The parent module also moves to the top
Sorting is based on most recent activity (last interaction timestamp)


5. Gamification & Competitive Mode
Competitive Mode Toggle:

Users can enable or disable Competitive Mode in their profile
When enabled: User earns ranking points and appears in global/weekly rankings
When disabled: User studies privately without affecting or appearing in rankings

Points System:
Points are calculated using the following formula:
ranking_points = (points / nb_questions_answered) × points + (nb_questions_answered × 0.02)
Where:

points = total points earned from correct answers
nb_questions_answered = total number of questions answered

Rankings:

Daily Ranking: Resets every 24 hours, shows top performers for the current day
Weekly Ranking: Resets every 7 days, shows top performers for the current week
Rankings display all users who have Competitive Mode enabled

Daily Goals:

Users can set personal daily targets (e.g., "Answer 100 questions today")
Progress tracker shows real-time completion (e.g., "50 done / 50 remaining")
Visual progress bar indicates percentage completed


6. Teams & Collaboration
Team Creation & Membership:

Any user can create a new team
Users can join existing teams via invitation
A user can be a member of multiple teams

Team Capabilities:

Share QCMs internally within the team
Share playlists with team members
Share personal notes with team members
Invite new members via in-app notifications
Team chat or discussion board (optional team communication)

Team Management:

Team creator becomes the team admin by default
Admins can:

Manage member access and permissions
Remove members
Transfer admin rights
Dissolve the team




7. Uploads
Users can upload the following content:

Profile Picture: Image file for user avatar
Images in Comments: Attach images to comments for better explanation or illustration

Supported formats: JPG, PNG, GIF (with size limitations defined by platform)

8. Notifications
Notification Settings:

Users can toggle notifications ON/OFF globally
Optional: Fine-grained control per notification type

Notification Types:
Users receive notifications for the following events:

Comment Reply: Someone replied to the user's comment
QCM Activity: Someone commented on a QCM the user has interacted with
Comment Upvote: Someone upvoted the user's comment
Comment Downvote: Someone downvoted the user's comment
Team Invitation: Someone invited the user to join a team
Team Activity: Activity within user's teams (optional)

Notification Details:
Each notification contains:

Type: Category of notification (reply, upvote, invitation, etc.)
Message: Description of the action
Target: Link to the relevant QCM, team, comment, or lesson
Timestamp: Date and time of the event
Status: Read or Unread
Actor: Who triggered the notification (when applicable)


9. Payment & Activation System
Account Activation Flow:

User signs up with email and password
After signup, user is redirected to Activation Page
User must enter a valid Activation Code to access the platform

Activation Code System:
Each activation code contains:

Unique Code Value: Alphanumeric string (e.g., "MED-2025-X7K9P")
Expiration Date: Optional date after which code becomes invalid
Plan Type: Defines subscription duration and features (e.g., "1 Month", "6 Months", "Pro Annual")
Usage Status: Single-use or multi-use

Code Validation:

Once a code is validated, it is permanently linked to the user's email
The code grants access according to its plan type
If the code has an expiration date, access is granted until that date
Expired or already-used codes are rejected with an error message

Admin Code Management:

Admins can generate new activation codes in bulk or individually
Admins can view all codes with their usage status
Admins can deactivate codes before they are used
Admins can see which user activated which code and when

Future Payment Integration:

Online payment gateways (Stripe, PayPal, etc.) will be integrated
Users can purchase activation codes directly through the platform
Manual activation code system remains as a fallback option


⚙️ ADMIN FUNCTIONALITIES
Administrators have the following exclusive capabilities:
Content Management

Create Modules: Add new modules to volets
Create Lessons: Add new lessons to modules
Create QCMs: Add new QCMs to lessons with propositions, answers, and explanations
Upload Lesson Content: Upload images for lessons or modules
Embed Videos: Embed video content (YouTube, Vimeo, etc.) into lessons or modules
Upload Full Lessons: Upload comprehensive lesson materials (PDFs, documents)

Default Content

Create Default Exams: Create pre-built exams visible to all users
Create Default Playlists: Create curated playlists available to all users

Moderation

Approve/Reject QCMs: Review and approve or reject user-submitted QCMs
Moderate Comments: Edit, hide, or delete inappropriate comments
Review Reports: Handle user-reported QCMs and take appropriate action
Manage Users: Suspend, ban, or modify user accounts

Activation Code Management

Generate Codes: Create new activation codes with custom parameters
Deactivate Codes: Invalidate unused codes
View Usage: See complete code usage history and analytics


❓ QCM FUNCTIONALITIES
Each QCM (Multiple Choice Question) contains the following components:
Core Content

Question Text: The main question statement
Propositions: Multiple answer choices (typically 4-6 options)
Correct Answers: One or more correct propositions (marked in system)
Explanation: Detailed explanation of why answers are correct or incorrect

Metadata

Associated Lesson: The lesson this QCM belongs to
Associated Module: The module this QCM belongs to (inherited from lesson)
Source: Origin of the QCM (e.g., "Oran University 2023", "Alger Faculty", "Dr. Smith")
Difficulty Level: Optional difficulty rating

User Interactions

Comments: All user comments on this QCM

Each comment can have replies (threaded discussions)
Each comment shows upvotes and downvotes count
Comments display author, timestamp, and edited status


Reports: List of user reports flagging this QCM for issues

Report type (error, inappropriate, outdated, etc.)
Report description
Reporter information and timestamp


User Notes: Personal notes users have created for this QCM (linked by user ID)

User Progress Data

Answer Status: Whether the current user has answered this QCM in the current layer
User's Answer: The propositions the user selected (if answered)
Correctness: Whether the user's answer was correct, partial, or incorrect
Added to Playlists: Which playlists include this QCM
Added to Last Look: Whether this QCM is in the user's Last Look list


📘 LESSON FUNCTIONALITIES
Each lesson is a collection of related QCMs within a specific topic.
Structure

Belongs to: One parent module
Contains: Multiple QCMs (typically 20-200 QCMs per lesson)
Title: Lesson name (e.g., "Cardiac Physiology", "Bacterial Infections")

Theoretical Content
Lesson Summary:

Text Content: Written explanation of key concepts
Images: Diagrams, charts, anatomical illustrations (uploaded by admin)
Videos: Embedded educational videos (uploaded/linked by admin)

QCM Summary:

Automatically generated overview of main concepts covered in the lesson's QCMs
Key topics and their frequency in the lesson

Progress Tracking
Dynamic QCM Statistics (changes with source filter):
The lesson tracks QCM completion in real-time based on the current layer and selected source filter:

Correct: Number of QCMs answered correctly (green)
False/Incorrect: Number of QCMs answered incorrectly (red)
Partial: Number of QCMs answered partially correctly (orange)
Remaining: Number of QCMs not yet answered
Total: Total number of QCMs in the lesson (with current filter applied)

Example without filter:
20 correct | 25 false | 20 partial
→ 65/120 answered, 55 remaining
Example with "Oran source" filter:
10 correct | 3 false | 5 partial
→ 18/50 answered, 32 remaining
Last Studied:

Timestamp of when the user last interacted with this lesson (e.g., "Last studied: 19 Jan 2025, 14:30")

Source Filtering
Filter by Source:

Users can filter QCMs by their source (university, faculty, author)
Available sources are dynamically populated based on QCMs in the lesson
When a filter is applied:

Only QCMs from that source are shown
Statistics recalculate to show only filtered QCMs
Progress bars and percentages update accordingly



Example Sources:

"Oran University 2024"
"Alger Faculty"
"Annaba Medical School"
"Dr. Benali Collection"

Layer-Specific Statistics
Per Layer Performance:

Each time a user completes a layer and starts a new one, the lesson preserves statistics from the previous layer
Users can view a layer history showing performance across all layers
Layer summary bar displays for each completed layer:

✅ Correct answers (green) - count and percentage
⚠️ Partial answers (orange) - count and percentage
❌ Incorrect answers (red) - count and percentage



Statistics behavior with source filter:

When a source filter is applied, layer statistics recalculate to show only QCMs from that source
This allows users to see their performance on specific source materials across different layers


🧩 MODULE FUNCTIONALITIES
A module is a collection of related lessons within a broader subject area.
Structure

Belongs to: One parent volet (e.g., "Cardiology" module → "Médecine" volet)
Contains: Multiple lessons (typically 5-20 lessons per module)
Title: Module name (e.g., "Cardiology", "Microbiology", "Pathological Anatomy")

Theoretical Content
Module Overview:

Text Content: Introduction to the module's subject area
Images: Overview diagrams, concept maps (uploaded by admin)
Videos: Introductory or comprehensive videos covering the module (uploaded/linked by admin)

Progress Tracking
User Statistics (current layer, with source filter applied):

Total QCMs in Module: Sum of all QCMs across all lessons in the module
QCMs Answered: Total answered in current layer (correct + partial + incorrect)
QCMs Remaining: Total not yet answered in current layer
Overall Performance %: (Correct QCMs / Total Answered) × 100
Breakdown by Lesson: Performance statistics for each lesson within the module

Last Studied:

Timestamp of when the user last interacted with any lesson in this module

Source Filtering
Filter by Source:

Users can apply source filters at the module level
Filter affects all lessons within the module
Statistics recalculate to show only QCMs from the selected source across all lessons
Example: Selecting "Oran University" shows only Oran QCMs and recalculates all module statistics accordingly

Layer-Specific Statistics
Per Layer Performance:

Module maintains aggregate statistics for each completed layer
Users can view performance history across all layers at the module level
Layer summary displays for the module:

Total QCMs answered in that layer (across all lessons)
✅ Correct answers (green) - count and percentage
⚠️ Partial answers (orange) - count and percentage
❌ Incorrect answers (red) - count and percentage



Statistics behavior with source filter:

When a source filter is applied, module-level layer statistics recalculate
Shows performance on filtered source materials across all lessons and all layers
Allows users to track their progression on specific university materials over time


📊 STATISTICS FUNCTIONALITIES
The platform provides comprehensive statistics at multiple levels: general, volet, module, lesson, and QCM.
1. General Statistics (Global Performance Over Time)
Line Graph Visualization:

X-axis: Days (timeline from user's join date to present)
Y-axis: Number of QCMs answered

Multiple Line Graphs (color-coded):

🖤 Black Line: Total QCMs answered per day
💚 Green Line: Correctly answered QCMs per day
❤️ Red Line: Incorrectly answered QCMs per day
🟧 Orange Line: Partially answered QCMs per day

Interactive Controls:

Users can toggle visibility for each line (show/hide individual metrics)
"Show All" option to display all lines simultaneously
Hover over data points to see exact numbers for that day

Additional Metrics:

Total cumulative QCMs answered to date
Current streak (consecutive days of activity)
Average daily QCMs answered

Filter Compatibility:

General statistics reflect the current source filter if applied
Can be viewed per layer or across all layers


2. Volet-Level Statistics
Volet = Major subject division (e.g., Biologie, Médecine, Chirurgie)
Triple Pie Chart Visualization:
Three separate pie charts displayed side by side, one for each volet:
Each pie chart shows:

Volet name (e.g., "Médecine")
Total QCMs in that volet
Performance breakdown by color:

💚 Green: Mastered (correctly answered) - percentage
🟧 Orange: Medium/Partial (partially answered) - percentage
❤️ Red: Weak (incorrectly answered) - percentage
⚪ Gray: Not yet attempted - percentage



Purpose:

Quick visual overview of performance across major subject areas
Identifies which volets need more attention
Helps balance study time across different subjects

Layer Compatibility:

Displays statistics for the current active layer
Can switch between layers to compare performance

Source Filter Compatibility:

When a source filter is applied, pie charts recalculate to show only QCMs from that source
Allows comparison of performance on different university materials


3. Module-Level Statistics
Pie Chart Visualization:
Single pie chart showing:

Module name
Completion percentage: (QCMs Answered / Total QCMs) × 100
Color-coded segments:

💚 Green: Correct answers
🟧 Orange: Partial answers
❤️ Red: Incorrect answers
⚪ Gray: Unanswered



Ranking List by Performance:
Below the pie chart, a sorted list of all modules showing:
1. Microbiologie — 167pt / 233pt → 71.6%
2. Anatomie pathologique — 159pt / 267pt → 59.6%
3. Cardiologie — 145pt / 310pt → 46.8%
4. Neurologie — 89pt / 198pt → 44.9%
...
For each module:

Rank (sorted by percentage)
Module name
Points earned / Total possible points
Success percentage
Visual progress bar (color-coded)

Purpose:

Identify weakest modules that need focus
Identify strongest modules where the user excels
Prioritize study time based on performance gaps

Layer Compatibility:

Shows statistics for the current layer
Historical view available to compare performance across layers
Layer summary bars can be displayed for each module showing performance in previous layers

Source Filter Compatibility:

When a source filter is applied:

Pie chart recalculates based on filtered QCMs
Ranking list updates to show performance on filtered content only
Percentages and point totals adjust accordingly




4. Lesson-Level Statistics
Pie Chart Visualization:
Single pie chart showing:

Lesson name
Percentage of QCMs resolved: (QCMs Answered / Total QCMs) × 100
Color-coded segments:

💚 Green: Correct answers (percentage)
🟧 Orange: Partial answers (percentage)
❤️ Red: Incorrect answers (percentage)
⚪ Gray: Unanswered (percentage)



Ranking List by Course:
Similar to module-level, a sorted list of all lessons within the current context:
1. Cardiac Physiology — 87pt / 98pt → 88.8%
2. Heart Pathologies — 156pt / 189pt → 82.5%
3. ECG Interpretation — 134pt / 178pt → 75.3%
4. Cardiac Pharmacology — 98pt / 156pt → 62.8%
...
For each lesson:

Rank (sorted by percentage)
Lesson name
Points earned / Total possible points
Success percentage
Visual progress bar (color-coded)
Last studied date

Purpose:

Identify specific lessons that need review
Track mastery of individual topics
Plan targeted study sessions

Layer Compatibility:

Displays current layer statistics by default
Layer history view shows performance across all completed layers
Layer summary bars for each lesson:

Display performance in each completed layer
✅ Correct (green) | ⚠️ Partial (orange) | ❌ Incorrect (red)
Shows progression or regression across layers



Source Filter Compatibility:

When a source filter is applied:

Pie chart recalculates to show only filtered QCMs
Ranking list updates accordingly
Layer statistics also filter by source
Example: "Show me my performance on Oran QCMs across all layers in this lesson"




5. QCM-Level Statistics (Individual Question History)
Bar Chart Visualization:
Single bar chart showing:

QCM identifier or question text (truncated)
Number of attempts across all layers
Color-coded segments for each attempt:

💚 Green: Correct answer
🟧 Orange: Partial answer
❤️ Red: Incorrect answer



Attempt History:
Detailed list of all attempts for this specific QCM:
Layer 3 — 15 Jan 2025, 14:30
   Your answer: A, C, D
   Correct answer: A, B, D
   Result: ⚠️ Partial (2/3 correct propositions)

Layer 2 — 08 Jan 2025, 09:15
   Your answer: A, C
   Correct answer: A, B, D
   Result: ❌ Incorrect (1/3 correct propositions)

Layer 1 — 02 Jan 2025, 16:45
   Your answer: C, D, E
   Correct answer: A, B, D
   Result: ❌ Incorrect (1/3 correct propositions)
For each attempt:

Layer number
Date and time of attempt
Propositions the user selected
Correct propositions
Result (correct, partial, incorrect) with color coding
Visual indicator (✅, ⚠️, or ❌)

Color-Coded Visualization:

Each attempt is color-coded for quick visual scanning
Green background for correct attempts
Orange background for partial attempts
Red background for incorrect attempts

Purpose:

Track improvement on specific difficult questions
Identify recurring mistakes
See learning progression over time
Review previous reasoning and answers

Additional Information:

Total times this QCM has been answered
Success rate across all attempts
Average time spent on this QCM (if time tracking is implemented)


Summary of Statistics Features
Cross-Cutting Features:

Layer Compatibility: All statistics can be viewed per layer or aggregated across all layers
Source Filtering: All statistics recalculate when a source filter is applied
Time Range Selection: Users can select custom date ranges for time-based statistics
Export Options: Users can export statistics as PDF or CSV for offline review
Comparison Mode: Users can compare statistics between different layers, time periods, or source filters

Statistics Hierarchy:
General (Global) Statistics
  ↓
Volet-Level Statistics
  ↓
Module-Level Statistics
  ↓
Lesson-Level Statistics
  ↓
QCM-Level Statistics
Each level provides progressively more granular insights while maintaining consistency in visualization and filtering capabilities.

🎯 SUMMARY OF KEY FEATURES
For Users:

Comprehensive QCM learning platform with gamification
Layer-based repetition system for mastery
Customizable playlists, notes, and study tools
Team collaboration and sharing
Detailed statistics and progress tracking at all levels
Flexible source filtering for targeted study
Competitive and private study modes

For Admins:

Full content management (modules, lessons, QCMs)
Multimedia upload capabilities (images, videos, documents)
Activation code system for access control
User and content moderation tools
Default exam and playlist creation

Technical Features:

Multi-level statistics with layer and source filter support
Activity-based dashboard sorting
Notification system with granular controls
Comment system with voting and threading
Revision automation (incorrect answers → revision playlist)
Performance tracking with historical data preservation