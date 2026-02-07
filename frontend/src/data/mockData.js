// Mock candidate data
// In production, this would be fetched from an API or database
export const mockCandidates = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    experience_years: 12,
    skills: "Production Management, Lean Manufacturing, Quality Control",
    education: "Bachelor's in Industrial Engineering",
    previous_role: "Production Supervisor",
    location: "Chicago, IL",
    evaluation: {
      crisis_management_score: 82.5,
      sustainability_score: 75.0,
      team_motivation_score: 88.0
    }
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    experience_years: 8,
    skills: "Waste Management, Sustainability, Environmental Regulations",
    education: "Bachelor's in Environmental Science",
    previous_role: "Waste Management Coordinator",
    location: "Portland, OR",
    evaluation: {
      crisis_management_score: 70.0,
      sustainability_score: 88.5,
      team_motivation_score: 72.0
    }
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    experience_years: 15,
    skills: "Team Leadership, Employee Development, Performance Management",
    education: "MBA",
    previous_role: "Plant Manager",
    location: "Houston, TX",
    evaluation: {
      crisis_management_score: 85.0,
      sustainability_score: 78.0,
      team_motivation_score: 90.0
    }
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    experience_years: 6,
    skills: "Operations Management, Supply Chain, Cost Reduction",
    education: "Bachelor's in Business Administration",
    previous_role: "Operations Manager",
    location: "Los Angeles, CA",
    evaluation: {
      crisis_management_score: 68.0,
      sustainability_score: 72.0,
      team_motivation_score: 75.0
    }
  },
  {
    id: 5,
    name: "David Williams",
    email: "david.williams@example.com",
    experience_years: 20,
    skills: "Production Management, Lean Manufacturing, Quality Control, Crisis Management",
    education: "Master's in Operations Management",
    previous_role: "Plant Manager",
    location: "Detroit, MI",
    evaluation: {
      crisis_management_score: 92.0,
      sustainability_score: 80.0,
      team_motivation_score: 85.0
    }
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    experience_years: 10,
    skills: "Continuous Improvement, Six Sigma, KPI Management",
    education: "Six Sigma Black Belt",
    previous_role: "Process Improvement Specialist",
    location: "Atlanta, GA",
    evaluation: {
      crisis_management_score: 75.0,
      sustainability_score: 70.0,
      team_motivation_score: 78.0
    }
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert.taylor@example.com",
    experience_years: 18,
    skills: "Equipment Maintenance, Troubleshooting, Technical Training",
    education: "Associate Degree in Industrial Management",
    previous_role: "Production Supervisor",
    location: "Cleveland, OH",
    evaluation: {
      crisis_management_score: 88.0,
      sustainability_score: 65.0,
      team_motivation_score: 82.0
    }
  },
  {
    id: 8,
    name: "Jennifer Martinez",
    email: "jennifer.martinez@example.com",
    experience_years: 7,
    skills: "Budget Management, Resource Planning, Vendor Relations",
    education: "Bachelor's in Business Administration",
    previous_role: "Manufacturing Coordinator",
    location: "Phoenix, AZ",
    evaluation: {
      crisis_management_score: 65.0,
      sustainability_score: 68.0,
      team_motivation_score: 70.0
    }
  },
  {
    id: 9,
    name: "James Brown",
    email: "james.brown@example.com",
    experience_years: 14,
    skills: "Crisis Management, Problem Solving, Decision Making",
    education: "Bachelor's in Industrial Engineering",
    previous_role: "Shift Supervisor",
    location: "Philadelphia, PA",
    evaluation: {
      crisis_management_score: 90.0,
      sustainability_score: 72.0,
      team_motivation_score: 80.0
    }
  },
  {
    id: 10,
    name: "Patricia Davis",
    email: "patricia.davis@example.com",
    experience_years: 9,
    skills: "Employee Development, Performance Management, Conflict Resolution",
    education: "Master's in Operations Management",
    previous_role: "Production Line Lead",
    location: "San Antonio, TX",
    evaluation: {
      crisis_management_score: 72.0,
      sustainability_score: 75.0,
      team_motivation_score: 88.0
    }
  },
  {
    id: 11,
    name: "Christopher Wilson",
    email: "christopher.wilson@example.com",
    experience_years: 11,
    skills: "Data Analysis, Reporting, ERP Systems",
    education: "Bachelor's in Business Administration",
    previous_role: "Operations Manager",
    location: "San Diego, CA",
    evaluation: {
      crisis_management_score: 78.0,
      sustainability_score: 70.0,
      team_motivation_score: 75.0
    }
  },
  {
    id: 12,
    name: "Linda Garcia",
    email: "linda.garcia@example.com",
    experience_years: 13,
    skills: "Recycling Operations, Material Sorting, Quality Assurance",
    education: "Bachelor's in Environmental Science",
    previous_role: "Waste Management Coordinator",
    location: "Dallas, TX",
    evaluation: {
      crisis_management_score: 80.0,
      sustainability_score: 85.0,
      team_motivation_score: 78.0
    }
  },
  {
    id: 13,
    name: "Daniel Miller",
    email: "daniel.miller@example.com",
    experience_years: 5,
    skills: "Project Management, Change Management, Strategic Planning",
    education: "MBA",
    previous_role: "Manufacturing Coordinator",
    location: "San Jose, CA",
    evaluation: {
      crisis_management_score: 60.0,
      sustainability_score: 65.0,
      team_motivation_score: 68.0
    }
  },
  {
    id: 14,
    name: "Barbara Moore",
    email: "barbara.moore@example.com",
    experience_years: 16,
    skills: "Health & Safety, OSHA Compliance, Risk Assessment",
    education: "Certified Production Manager (CPM)",
    previous_role: "Production Supervisor",
    location: "Austin, TX",
    evaluation: {
      crisis_management_score: 85.0,
      sustainability_score: 78.0,
      team_motivation_score: 82.0
    }
  },
  {
    id: 15,
    name: "Richard Jackson",
    email: "richard.jackson@example.com",
    experience_years: 19,
    skills: "Inventory Management, Logistics, Distribution",
    education: "Master's in Operations Management",
    previous_role: "Plant Manager",
    location: "Jacksonville, FL",
    evaluation: {
      crisis_management_score: 88.0,
      sustainability_score: 75.0,
      team_motivation_score: 85.0
    }
  },
  {
    id: 16,
    name: "Susan White",
    email: "susan.white@example.com",
    experience_years: 8,
    skills: "Automation, Technology Integration, Digital Transformation",
    education: "Bachelor's in Industrial Engineering",
    previous_role: "Process Improvement Specialist",
    location: "Columbus, OH",
    evaluation: {
      crisis_management_score: 70.0,
      sustainability_score: 72.0,
      team_motivation_score: 75.0
    }
  },
  {
    id: 17,
    name: "Joseph Harris",
    email: "joseph.harris@example.com",
    experience_years: 12,
    skills: "Production Management, Lean Manufacturing, Quality Control",
    education: "Six Sigma Green Belt",
    previous_role: "Production Supervisor",
    location: "Charlotte, NC",
    evaluation: {
      crisis_management_score: 82.0,
      sustainability_score: 78.0,
      team_motivation_score: 80.0
    }
  },
  {
    id: 18,
    name: "Jessica Clark",
    email: "jessica.clark@example.com",
    experience_years: 7,
    skills: "Team Leadership, Process Optimization, Safety Compliance",
    education: "Bachelor's in Business Administration",
    previous_role: "Shift Supervisor",
    location: "Seattle, WA",
    evaluation: {
      crisis_management_score: 68.0,
      sustainability_score: 70.0,
      team_motivation_score: 78.0
    }
  },
  {
    id: 19,
    name: "Thomas Lewis",
    email: "thomas.lewis@example.com",
    experience_years: 14,
    skills: "Waste Management, Sustainability, Environmental Regulations",
    education: "Bachelor's in Environmental Science",
    previous_role: "Environmental Compliance Officer",
    location: "Denver, CO",
    evaluation: {
      crisis_management_score: 75.0,
      sustainability_score: 88.0,
      team_motivation_score: 72.0
    }
  },
  {
    id: 20,
    name: "Karen Walker",
    email: "karen.walker@example.com",
    experience_years: 10,
    skills: "Operations Management, Supply Chain, Cost Reduction",
    education: "Master's in Operations Management",
    previous_role: "Operations Manager",
    location: "Boston, MA",
    evaluation: {
      crisis_management_score: 78.0,
      sustainability_score: 75.0,
      team_motivation_score: 80.0
    }
  },
  {
    id: 21,
    name: "Charles Hall",
    email: "charles.hall@example.com",
    experience_years: 17,
    skills: "Continuous Improvement, Six Sigma, KPI Management",
    education: "Six Sigma Black Belt",
    previous_role: "Plant Manager",
    location: "El Paso, TX",
    evaluation: {
      crisis_management_score: 85.0,
      sustainability_score: 80.0,
      team_motivation_score: 88.0
    }
  },
  {
    id: 22,
    name: "Nancy Allen",
    email: "nancy.allen@example.com",
    experience_years: 6,
    skills: "Equipment Maintenance, Troubleshooting, Technical Training",
    education: "Associate Degree in Industrial Management",
    previous_role: "Production Line Lead",
    location: "Nashville, TN",
    evaluation: {
      crisis_management_score: 65.0,
      sustainability_score: 68.0,
      team_motivation_score: 70.0
    }
  },
  {
    id: 23,
    name: "Matthew Young",
    email: "matthew.young@example.com",
    experience_years: 11,
    skills: "Budget Management, Resource Planning, Vendor Relations",
    education: "Bachelor's in Business Administration",
    previous_role: "Manufacturing Coordinator",
    location: "Detroit, MI",
    evaluation: {
      crisis_management_score: 75.0,
      sustainability_score: 72.0,
      team_motivation_score: 78.0
    }
  },
  {
    id: 24,
    name: "Betty King",
    email: "betty.king@example.com",
    experience_years: 9,
    skills: "Crisis Management, Problem Solving, Decision Making",
    education: "Bachelor's in Industrial Engineering",
    previous_role: "Production Supervisor",
    location: "Oklahoma City, OK",
    evaluation: {
      crisis_management_score: 80.0,
      sustainability_score: 70.0,
      team_motivation_score: 75.0
    }
  },
  {
    id: 25,
    name: "Anthony Wright",
    email: "anthony.wright@example.com",
    experience_years: 13,
    skills: "Employee Development, Performance Management, Conflict Resolution",
    education: "MBA",
    previous_role: "Operations Manager",
    location: "Portland, OR",
    evaluation: {
      crisis_management_score: 78.0,
      sustainability_score: 75.0,
      team_motivation_score: 85.0
    }
  },
  {
    id: 26,
    name: "Helen Lopez",
    email: "helen.lopez@example.com",
    experience_years: 15,
    skills: "Data Analysis, Reporting, ERP Systems",
    education: "Master's in Operations Management",
    previous_role: "Plant Manager",
    location: "Las Vegas, NV",
    evaluation: {
      crisis_management_score: 82.0,
      sustainability_score: 78.0,
      team_motivation_score: 80.0
    }
  },
  {
    id: 27,
    name: "Mark Hill",
    email: "mark.hill@example.com",
    experience_years: 8,
    skills: "Recycling Operations, Material Sorting, Quality Assurance",
    education: "Bachelor's in Environmental Science",
    previous_role: "Waste Management Coordinator",
    location: "Milwaukee, WI",
    evaluation: {
      crisis_management_score: 70.0,
      sustainability_score: 85.0,
      team_motivation_score: 72.0
    }
  },
  {
    id: 28,
    name: "Sandra Scott",
    email: "sandra.scott@example.com",
    experience_years: 12,
    skills: "Project Management, Change Management, Strategic Planning",
    education: "Six Sigma Green Belt",
    previous_role: "Process Improvement Specialist",
    location: "Albuquerque, NM",
    evaluation: {
      crisis_management_score: 80.0,
      sustainability_score: 75.0,
      team_motivation_score: 78.0
    }
  },
  {
    id: 29,
    name: "Donald Green",
    email: "donald.green@example.com",
    experience_years: 16,
    skills: "Health & Safety, OSHA Compliance, Risk Assessment",
    education: "Certified Production Manager (CPM)",
    previous_role: "Production Supervisor",
    location: "Tucson, AZ",
    evaluation: {
      crisis_management_score: 88.0,
      sustainability_score: 80.0,
      team_motivation_score: 82.0
    }
  },
  {
    id: 30,
    name: "Donna Adams",
    email: "donna.adams@example.com",
    experience_years: 7,
    skills: "Inventory Management, Logistics, Distribution",
    education: "Bachelor's in Business Administration",
    previous_role: "Manufacturing Coordinator",
    location: "Fresno, CA",
    evaluation: {
      crisis_management_score: 68.0,
      sustainability_score: 70.0,
      team_motivation_score: 75.0
    }
  },
  {
    id: 31,
    name: "Steven Baker",
    email: "steven.baker@example.com",
    experience_years: 10,
    skills: "Automation, Technology Integration, Digital Transformation",
    education: "Bachelor's in Industrial Engineering",
    previous_role: "Production Line Lead",
    location: "Sacramento, CA",
    evaluation: {
      crisis_management_score: 75.0,
      sustainability_score: 72.0,
      team_motivation_score: 78.0
    }
  },
  {
    id: 32,
    name: "Carol Nelson",
    email: "carol.nelson@example.com",
    experience_years: 14,
    skills: "Production Management, Lean Manufacturing, Quality Control",
    education: "Master's in Operations Management",
    previous_role: "Operations Manager",
    location: "Kansas City, MO",
    evaluation: {
      crisis_management_score: 82.0,
      sustainability_score: 78.0,
      team_motivation_score: 85.0
    }
  },
  {
    id: 33,
    name: "Paul Carter",
    email: "paul.carter@example.com",
    experience_years: 9,
    skills: "Team Leadership, Process Optimization, Safety Compliance",
    education: "Six Sigma Green Belt",
    previous_role: "Shift Supervisor",
    location: "Mesa, AZ",
    evaluation: {
      crisis_management_score: 72.0,
      sustainability_score: 75.0,
      team_motivation_score: 80.0
    }
  },
  {
    id: 34,
    name: "Michelle Mitchell",
    email: "michelle.mitchell@example.com",
    experience_years: 11,
    skills: "Waste Management, Sustainability, Environmental Regulations",
    education: "Bachelor's in Environmental Science",
    previous_role: "Environmental Compliance Officer",
    location: "Atlanta, GA",
    evaluation: {
      crisis_management_score: 78.0,
      sustainability_score: 88.0,
      team_motivation_score: 75.0
    }
  },
  {
    id: 35,
    name: "Andrew Perez",
    email: "andrew.perez@example.com",
    experience_years: 13,
    skills: "Operations Management, Supply Chain, Cost Reduction",
    education: "MBA",
    previous_role: "Operations Manager",
    location: "Virginia Beach, VA",
    evaluation: {
      crisis_management_score: 80.0,
      sustainability_score: 78.0,
      team_motivation_score: 82.0
    }
  },
  {
    id: 36,
    name: "Laura Roberts",
    email: "laura.roberts@example.com",
    experience_years: 8,
    skills: "Continuous Improvement, Six Sigma, KPI Management",
    education: "Bachelor's in Business Administration",
    previous_role: "Process Improvement Specialist",
    location: "Omaha, NE",
    evaluation: {
      crisis_management_score: 70.0,
      sustainability_score: 72.0,
      team_motivation_score: 75.0
    }
  },
  {
    id: 37,
    name: "Joshua Turner",
    email: "joshua.turner@example.com",
    experience_years: 15,
    skills: "Equipment Maintenance, Troubleshooting, Technical Training",
    education: "Associate Degree in Industrial Management",
    previous_role: "Production Supervisor",
    location: "Minneapolis, MN",
    evaluation: {
      crisis_management_score: 85.0,
      sustainability_score: 75.0,
      team_motivation_score: 88.0
    }
  },
  {
    id: 38,
    name: "Kimberly Phillips",
    email: "kimberly.phillips@example.com",
    experience_years: 6,
    skills: "Budget Management, Resource Planning, Vendor Relations",
    education: "Bachelor's in Business Administration",
    previous_role: "Manufacturing Coordinator",
    location: "Tulsa, OK",
    evaluation: {
      crisis_management_score: 65.0,
      sustainability_score: 68.0,
      team_motivation_score: 70.0
    }
  },
  {
    id: 39,
    name: "Kevin Campbell",
    email: "kevin.campbell@example.com",
    experience_years: 12,
    skills: "Crisis Management, Problem Solving, Decision Making",
    education: "Bachelor's in Industrial Engineering",
    previous_role: "Production Line Lead",
    location: "Arlington, TX",
    evaluation: {
      crisis_management_score: 82.0,
      sustainability_score: 70.0,
      team_motivation_score: 80.0
    }
  },
  {
    id: 40,
    name: "Deborah Parker",
    email: "deborah.parker@example.com",
    experience_years: 10,
    skills: "Employee Development, Performance Management, Conflict Resolution",
    education: "Master's in Operations Management",
    previous_role: "Operations Manager",
    location: "Corpus Christi, TX",
    evaluation: {
      crisis_management_score: 75.0,
      sustainability_score: 78.0,
      team_motivation_score: 85.0
    }
  }
]
