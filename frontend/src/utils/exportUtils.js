/**
 * Export utilities for candidate data
 */

/**
 * Export candidates to CSV format
 */
export function exportToCSV(candidates, filename = 'candidates.csv') {
  if (!candidates || candidates.length === 0) {
    alert('No candidates to export')
    return
  }

  // CSV headers
  const headers = [
    'ID',
    'Name',
    'Email',
    'Phone',
    'Experience (Years)',
    'Skills',
    'Education',
    'Previous Role',
    'Location',
    'Crisis Management Score',
    'Sustainability Score',
    'Team Motivation Score',
    'Average Score'
  ]

  // Convert candidates to CSV rows
  const rows = candidates.map(candidate => {
    const avgScore = candidate.evaluation
      ? (
          candidate.evaluation.crisis_management_score +
          candidate.evaluation.sustainability_score +
          candidate.evaluation.team_motivation_score
        ) / 3
      : 0

    return [
      candidate.id || '',
      `"${(candidate.name || '').replace(/"/g, '""')}"`,
      candidate.email || '',
      candidate.phone || '',
      candidate.experience_years || 0,
      `"${(candidate.skills || '').replace(/"/g, '""')}"`,
      `"${(candidate.education || '').replace(/"/g, '""')}"`,
      `"${(candidate.previous_role || '').replace(/"/g, '""')}"`,
      `"${(candidate.location || '').replace(/"/g, '""')}"`,
      candidate.evaluation?.crisis_management_score?.toFixed(2) || '0.00',
      candidate.evaluation?.sustainability_score?.toFixed(2) || '0.00',
      candidate.evaluation?.team_motivation_score?.toFixed(2) || '0.00',
      avgScore.toFixed(2)
    ].join(',')
  })

  // Combine headers and rows
  const csvContent = [headers.join(','), ...rows].join('\n')

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Export candidates to JSON format
 */
export function exportToJSON(candidates, filename = 'candidates.json') {
  if (!candidates || candidates.length === 0) {
    alert('No candidates to export')
    return
  }

  const jsonContent = JSON.stringify(candidates, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Generate PDF report (using browser print functionality)
 */
export function exportToPDF(candidates, title = 'Candidate Report') {
  if (!candidates || candidates.length === 0) {
    alert('No candidates to export')
    return
  }

  // Create a printable HTML document
  const printWindow = window.open('', '_blank')
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          color: #333;
        }
        h1 {
          color: #2d8659;
          border-bottom: 3px solid #2d8659;
          padding-bottom: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        th {
          background-color: #2d8659;
          color: white;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .score {
          font-weight: bold;
        }
        .score-high { color: #4caf50; }
        .score-medium { color: #ffd43b; }
        .score-low { color: #ff6b6b; }
        @media print {
          body { padding: 10px; }
          @page { margin: 1cm; }
        }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <p>Generated on: ${new Date().toLocaleString()}</p>
      <p>Total Candidates: ${candidates.length}</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Experience</th>
            <th>Crisis Mgmt</th>
            <th>Sustainability</th>
            <th>Team Mot.</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          ${candidates.map(candidate => {
            const avgScore = candidate.evaluation
              ? (
                  candidate.evaluation.crisis_management_score +
                  candidate.evaluation.sustainability_score +
                  candidate.evaluation.team_motivation_score
                ) / 3
              : 0
            const scoreClass = avgScore >= 80 ? 'score-high' : avgScore >= 60 ? 'score-medium' : 'score-low'
            
            return `
              <tr>
                <td>${candidate.id || ''}</td>
                <td>${candidate.name || ''}</td>
                <td>${candidate.email || ''}</td>
                <td>${candidate.experience_years || 0} years</td>
                <td class="score">${candidate.evaluation?.crisis_management_score?.toFixed(1) || '0.0'}</td>
                <td class="score">${candidate.evaluation?.sustainability_score?.toFixed(1) || '0.0'}</td>
                <td class="score">${candidate.evaluation?.team_motivation_score?.toFixed(1) || '0.0'}</td>
                <td class="score ${scoreClass}">${avgScore.toFixed(1)}</td>
              </tr>
            `
          }).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `

  printWindow.document.write(htmlContent)
  printWindow.document.close()
  printWindow.focus()
  
  // Wait for content to load, then print
  setTimeout(() => {
    printWindow.print()
  }, 250)
}
