# Recycling Production Line Manager Selection System

A comprehensive candidate ranking system for evaluating and selecting recycling production line managers. This system includes database design, AI-powered evaluation prompts, and an interactive dashboard for visualizing candidate rankings.

## 📋 Features

- **Database Design**: MySQL-compatible schema with candidates, evaluations, and rankings tables
- **AI Evaluation**: Three specialized prompts for evaluating crisis management, sustainability knowledge, and team motivation
- **Interactive Dashboard**: React + Vite dashboard with:
  - **Leaderboard**: Top 10 candidates ranked by total score
  - **Skill Heatmap**: Visual representation of all candidate scores
  - **Candidate Cards**: Detailed profiles for all 40 candidates
- **Random Data Generation**: Faker.js script to generate 40 realistic candidate profiles
- **Share Functionality**: Share candidate profiles with HR team

## 🚀 Quick Start

### Prerequisites

- Node.js (v20.19.0 or higher recommended)
- MySQL (or compatible database)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd venu
   ```

2. **Set up the database**
   ```bash
   # Create your MySQL database
   mysql -u root -p
   CREATE DATABASE recycling_manager_selection;
   USE recycling_manager_selection;
   
   # Run the schema
   source database/schema.sql
   
   # Generate and load sample data
   cd scripts
   npm install
   npm run generate
   cd ..
   
   # Load the generated data
   mysql -u root -p recycling_manager_selection < database/sample_data.sql
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the dashboard**
   - Open your browser to `http://localhost:5173`
   - The dashboard will display all 40 candidates with their evaluations

## 📁 Project Structure

```
venu/
├── database/
│   ├── schema.sql              # MySQL database schema
│   └── sample_data.sql         # Generated sample data (40 candidates)
├── scripts/
│   ├── generateCandidates.js  # Faker.js script to generate candidates
│   └── package.json           # Script dependencies
├── ai-prompts/
│   └── evaluation-prompts.md  # AI evaluation prompts documentation
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Leaderboard.jsx    # Top 10 leaderboard component
│   │   │   ├── SkillHeatmap.jsx   # Skill visualization component
│   │   │   └── CandidateCards.jsx # Candidate profile cards
│   │   ├── data/
│   │   │   └── mockData.js        # Mock candidate data
│   │   ├── App.jsx               # Main application component
│   │   └── main.jsx              # Application entry point
│   └── package.json
└── README.md
```

## 🗄️ Database Schema

### Tables

1. **candidates**
   - Stores candidate profile information
   - Fields: id, name, email, experience_years, skills, education, previous_role, location

2. **evaluations**
   - Stores AI-generated evaluation scores and feedback
   - Fields: candidate_id, crisis_management_score, sustainability_score, team_motivation_score, feedback fields

3. **rankings**
   - Auto-updated table with candidate rankings
   - Fields: candidate_id, total_score, rank_position
   - Automatically updated via triggers when evaluations change

### Key Features

- **Triggers**: Automatic ranking recalculation when evaluations are inserted/updated
- **Indexes**: Optimized for common queries (experience, scores, rankings)
- **Constraints**: Data validation and referential integrity
- **View**: `candidate_leaderboard` for easy querying

## 🤖 AI Evaluation Prompts

The system includes three specialized evaluation prompts with **full AI API integration**:

1. **Crisis Management** (0-100 score)
   - Evaluates experience with production disruptions
   - Decision-making under pressure
   - Communication and coordination skills
   - Problem-solving approach

2. **Sustainability Knowledge** (0-100 score)
   - Environmental knowledge and regulations
   - Sustainability experience
   - Commitment to environmental values
   - Innovation in sustainability

3. **Team Motivation** (0-100 score)
   - Leadership experience
   - Motivation techniques
   - Employee development
   - Communication and engagement

### AI Integration

The system supports **real AI evaluation** using:
- ✅ **OpenAI GPT-4** - High-quality evaluations
- ✅ **Anthropic Claude** - Alternative AI provider
- ✅ **Mock Evaluations** - For testing without API keys

**Setup:**
1. Create `frontend/.env` file
2. Add your API key: `VITE_OPENAI_API_KEY=your_key_here` or `VITE_ANTHROPIC_API_KEY=your_key_here`
3. Restart dev server
4. Use the AI Evaluation Panel in the dashboard

See `ai-prompts/evaluation-prompts.md` for detailed prompt documentation and `frontend/AI_INTEGRATION.md` for setup instructions.

## 🎨 Dashboard Features

### Leaderboard Tab
- Displays top 10 candidates ranked by total score
- Color-coded badges for quick score assessment
- Sortable columns for easy comparison

### Skill Heatmap Tab
- Visual heatmap showing all candidates' scores
- Color-coded cells (green: 80+, blue: 70-79, yellow: 60-69, red: <60)
- Tooltips for detailed score information

### All Candidates Tab
- Grid layout of candidate cards
- Detailed profile information
- Individual score breakdowns
- "Share Candidate" button for HR workflows

## 🔧 Configuration

### Generating New Candidate Data

To generate a new set of 40 candidates:

```bash
cd scripts
npm install
npm run generate
```

This will:
- Generate 40 realistic candidate profiles using Faker.js
- Create SQL INSERT statements in `database/sample_data.sql`
- Generate JSON data for frontend use in `frontend/src/data/candidates.json`

### Customizing AI Prompts

Edit `ai-prompts/evaluation-prompts.md` to modify evaluation criteria or add new dimensions.

### Connecting to Real Database

To connect the frontend to a real database:

1. Create a backend API (Node.js/Express recommended)
2. Replace `mockData.js` imports with API calls
3. Update `App.jsx` to fetch from your API endpoint

Example API endpoint structure:
```
GET /api/candidates - Get all candidates with evaluations
GET /api/candidates/:id - Get single candidate details
POST /api/candidates/:id/share - Share candidate profile
```

## 📊 Evaluation Criteria

| Score Range | Rating | Description |
|------------|--------|-------------|
| 90-100 | Excellent | Exceptional candidate, highly recommended |
| 80-89 | Very Good | Strong candidate with minor development areas |
| 70-79 | Good | Solid candidate, meets most requirements |
| 60-69 | Fair | Adequate candidate, needs development |
| 50-59 | Developing | Candidate shows potential but requires significant growth |
| 0-49 | Insufficient | Does not meet minimum requirements |

## 🛠️ Technologies Used

- **Frontend**: React 19, Vite 7
- **UI Library**: Mantine UI
- **Database**: MySQL
- **Data Generation**: Faker.js
- **Styling**: Mantine Core styles

## 📝 Notes

- The current implementation uses mock data for the frontend
- AI evaluation prompts are designed to work with Claude, GPT-4, or similar AI APIs
- The database triggers automatically maintain rankings when evaluations change
- All candidate data is randomly generated for demonstration purposes

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time AI evaluation integration
- [ ] Advanced filtering and search
- [ ] Export functionality (PDF, CSV)
- [ ] Candidate comparison tool
- [ ] Interview scheduling integration
- [ ] Email notifications for HR team

## 📄 License

This project is created for evaluation purposes.

## 👤 Author

Created for G CP candidate selection assignment.

---

**Deadline**: [Insert date]

**Submission Includes**:
- ✅ GitHub Repository (code + SQL schema)
- ✅ AI Prompts (Markdown documentation)
- ✅ Dashboard Screenshots/Video
- ✅ README with setup instructions
