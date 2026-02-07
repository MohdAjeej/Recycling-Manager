const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

// Skills relevant to recycling production line management
const skillSets = [
    'Production Management, Lean Manufacturing, Quality Control',
    'Team Leadership, Process Optimization, Safety Compliance',
    'Waste Management, Sustainability, Environmental Regulations',
    'Operations Management, Supply Chain, Cost Reduction',
    'Continuous Improvement, Six Sigma, KPI Management',
    'Equipment Maintenance, Troubleshooting, Technical Training',
    'Budget Management, Resource Planning, Vendor Relations',
    'Crisis Management, Problem Solving, Decision Making',
    'Employee Development, Performance Management, Conflict Resolution',
    'Data Analysis, Reporting, ERP Systems',
    'Recycling Operations, Material Sorting, Quality Assurance',
    'Project Management, Change Management, Strategic Planning',
    'Health & Safety, OSHA Compliance, Risk Assessment',
    'Inventory Management, Logistics, Distribution',
    'Automation, Technology Integration, Digital Transformation'
];

const educationLevels = [
    'High School Diploma',
    'Associate Degree in Industrial Management',
    'Bachelor\'s in Business Administration',
    'Bachelor\'s in Industrial Engineering',
    'Bachelor\'s in Environmental Science',
    'Master\'s in Operations Management',
    'MBA',
    'Certified Production Manager (CPM)',
    'Six Sigma Green Belt',
    'Six Sigma Black Belt'
];

const previousRoles = [
    'Production Supervisor',
    'Operations Manager',
    'Plant Manager',
    'Quality Control Manager',
    'Manufacturing Coordinator',
    'Production Line Lead',
    'Shift Supervisor',
    'Process Improvement Specialist',
    'Waste Management Coordinator',
    'Environmental Compliance Officer'
];

// Generate 40 candidates
const candidates = [];
for (let i = 1; i <= 40; i++) {
    const candidate = {
        id: i,
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number('###-###-####'),
        experience_years: faker.number.int({ min: 2, max: 25 }),
        skills: faker.helpers.arrayElement(skillSets),
        education: faker.helpers.arrayElement(educationLevels),
        previous_role: faker.helpers.arrayElement(previousRoles),
        location: `${faker.location.city()}, ${faker.location.state({ abbreviated: true })}`
    };
    candidates.push(candidate);
}

// Generate SQL INSERT statements
const sqlStatements = [];

// Insert candidates
sqlStatements.push('-- Insert 40 candidates\n');
sqlStatements.push('INSERT INTO candidates (id, name, email, phone, experience_years, skills, education, previous_role, location) VALUES\n');

const candidateValues = candidates.map((c, index) => {
    const skillsEscaped = c.skills.replace(/'/g, "''");
    const educationEscaped = c.education.replace(/'/g, "''");
    const previousRoleEscaped = c.previous_role.replace(/'/g, "''");
    const locationEscaped = c.location.replace(/'/g, "''");
    
    return `(${c.id}, '${c.name.replace(/'/g, "''")}', '${c.email}', '${c.phone}', ${c.experience_years}, '${skillsEscaped}', '${educationEscaped}', '${previousRoleEscaped}', '${locationEscaped}')`;
});

sqlStatements.push(candidateValues.join(',\n') + ';\n\n');

// Generate mock evaluations with realistic score distributions
sqlStatements.push('-- Insert evaluations (mock AI scores)\n');
sqlStatements.push('INSERT INTO evaluations (candidate_id, crisis_management_score, sustainability_score, team_motivation_score, crisis_management_feedback, sustainability_feedback, team_motivation_feedback) VALUES\n');

const evaluationValues = candidates.map((c, index) => {
    // Generate scores with correlation to experience, skills, and role
    let baseScore = 50 + (c.experience_years * 1.5) + faker.number.int({ min: -10, max: 20 });
    
    // Skill-based score adjustments
    const skillsLower = c.skills.toLowerCase();
    if (skillsLower.includes('crisis') || skillsLower.includes('problem solving')) {
        baseScore += 5; // Boost for crisis management skills
    }
    if (skillsLower.includes('sustainability') || skillsLower.includes('waste management') || skillsLower.includes('environmental')) {
        baseScore += 5; // Boost for sustainability skills
    }
    if (skillsLower.includes('team') || skillsLower.includes('leadership') || skillsLower.includes('employee')) {
        baseScore += 5; // Boost for team management skills
    }
    
    // Role-based adjustments
    const roleLower = c.previous_role.toLowerCase();
    if (roleLower.includes('manager') || roleLower.includes('supervisor')) {
        baseScore += 3; // Leadership roles get slight boost
    }
    if (roleLower.includes('waste') || roleLower.includes('environmental')) {
        baseScore += 4; // Direct recycling experience boost
    }
    
    // Education-based adjustments
    const eduLower = c.education.toLowerCase();
    if (eduLower.includes('master') || eduLower.includes('mba')) {
        baseScore += 3;
    }
    if (eduLower.includes('six sigma') || eduLower.includes('cpm')) {
        baseScore += 2; // Certifications boost
    }
    
    // Generate dimension-specific scores with skill correlation
    let crisisScore = baseScore;
    let sustainabilityScore = baseScore;
    let teamScore = baseScore;
    
    // Crisis Management correlation
    if (skillsLower.includes('crisis') || skillsLower.includes('problem solving') || roleLower.includes('supervisor')) {
        crisisScore += faker.number.int({ min: 5, max: 15 });
    } else {
        crisisScore += faker.number.int({ min: -15, max: 10 });
    }
    
    // Sustainability correlation
    if (skillsLower.includes('sustainability') || skillsLower.includes('waste') || skillsLower.includes('environmental') || roleLower.includes('waste') || roleLower.includes('environmental')) {
        sustainabilityScore += faker.number.int({ min: 5, max: 15 });
    } else {
        sustainabilityScore += faker.number.int({ min: -15, max: 10 });
    }
    
    // Team Motivation correlation
    if (skillsLower.includes('team') || skillsLower.includes('leadership') || skillsLower.includes('employee') || roleLower.includes('manager')) {
        teamScore += faker.number.int({ min: 5, max: 15 });
    } else {
        teamScore += faker.number.int({ min: -15, max: 10 });
    }
    
    // Final score clamping
    crisisScore = Math.min(100, Math.max(0, Math.round(crisisScore)));
    sustainabilityScore = Math.min(100, Math.max(0, Math.round(sustainabilityScore)));
    teamScore = Math.min(100, Math.max(0, Math.round(teamScore)));
    
    const crisisFeedback = `Demonstrates ${crisisScore >= 70 ? 'strong' : crisisScore >= 50 ? 'moderate' : 'developing'} crisis management capabilities. ${c.experience_years} years of experience in ${c.previous_role.toLowerCase()} provides foundation for handling production disruptions.`;
    const sustainabilityFeedback = `Shows ${sustainabilityScore >= 70 ? 'excellent' : sustainabilityScore >= 50 ? 'good' : 'basic'} understanding of sustainability principles. Background in ${c.previous_role.toLowerCase()} aligns with recycling operations.`;
    const teamFeedback = `Exhibits ${teamScore >= 70 ? 'strong' : teamScore >= 50 ? 'adequate' : 'developing'} team leadership skills. Experience level suggests ${teamScore >= 70 ? 'proven' : 'growing'} ability to motivate production teams.`;
    
    return `(${c.id}, ${crisisScore.toFixed(2)}, ${sustainabilityScore.toFixed(2)}, ${teamScore.toFixed(2)}, '${crisisFeedback.replace(/'/g, "''")}', '${sustainabilityFeedback.replace(/'/g, "''")}', '${teamFeedback.replace(/'/g, "''")}')`;
});

sqlStatements.push(evaluationValues.join(',\n') + ';\n');

// Write to file
const outputPath = path.join(__dirname, '..', 'database', 'sample_data.sql');
fs.writeFileSync(outputPath, sqlStatements.join(''), 'utf8');

console.log(`✅ Generated ${candidates.length} candidates and evaluations`);
console.log(`📁 Output written to: ${outputPath}`);

// Also generate JSON for frontend use
const jsonOutput = {
    candidates: candidates.map(c => ({
        ...c,
        evaluation: {
            crisis_management_score: parseFloat(evaluationValues[c.id - 1].match(/(\d+\.\d+)/g)[0]),
            sustainability_score: parseFloat(evaluationValues[c.id - 1].match(/(\d+\.\d+)/g)[1]),
            team_motivation_score: parseFloat(evaluationValues[c.id - 1].match(/(\d+\.\d+)/g)[2])
        }
    }))
};

const jsonPath = path.join(__dirname, '..', 'frontend', 'src', 'data', 'candidates.json');
fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
fs.writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2), 'utf8');

console.log(`📁 JSON data written to: ${jsonPath}`);
