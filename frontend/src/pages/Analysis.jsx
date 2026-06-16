import React from 'react';
import '../assets/analysis.css';


function Analysis() {
  // Sample data structure based on your backend response
  const storedData = localStorage.getItem("analysis");

const analysisData = storedData
  ? JSON.parse(storedData)
  : null;
  const defaultData = {
    files: [],
    extensions: { ".py": 0, ".js": 0, ".java": 0, ".jsx": 0, ".cpp": 0, ".c": 0, ".rb": 0, ".go": 0, ".ts": 0, ".md": 0, ".css": 0, ".html": 0 },
    total_files: 0,
    total_lines: 0,
    language_percentages: {},
    main_language: "Unknown",
    code_complexity: "Medium",
    line_count_with_extensions: {},
    project_dependencies: [],
    project_type: "Unknown",
    complexity: { small_files: 0, Medium_files: 0, large_files: 0 }
  };

  const data = analysisData || defaultData;

  // Helper to get complexity icon and color
  const getComplexityIcon = (level) => {
    switch(level?.toLowerCase()) {
      case 'low': return { icon: 'fa-seedling', color: '#2ecc71' };
      case 'medium': return { icon: 'fa-chart-line', color: '#f39c12' };
      case 'high': return { icon: 'fa-fire', color: '#e74c3c' };
      default: return { icon: 'fa-chart-simple', color: '#3498db' };
    }
  };

  const complexityStyle = getComplexityIcon(data.code_complexity);

  // Top languages for display
  const topLanguages = Object.entries(data.language_percentages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // File size distribution
  const fileSizeDistribution = [
    { label: 'Small (< 200 lines)', value: data.complexity?.small_files || 0, icon: 'fa-file-lines', color: '#27ae60' },
    { label: 'Medium (200-500 lines)', value: data.complexity?.Medium_files || 0, icon: 'fa-file-lines', color: '#f39c12' },
    { label: 'Large (> 500 lines)', value: data.complexity?.large_files || 0, icon: 'fa-file-lines', color: '#e74c3c' }
  ];

  const totalComplexityFiles = fileSizeDistribution.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="analysis-container">
      {/* Header Section */}
      <div className="analysis-header">
        <div className="header-content">
          <div className="title-section">
            <div className="icon-wrapper">
              <i className="fab fa-github-alt"></i>
            </div>
            <h1>AI GitHub Analyzer</h1>
            <span className="beta-badge">Intelligence Dashboard</span>
          </div>
          <div className="header-stats">
            <div className="stat-chip">
              <i className="fas fa-code-branch"></i>
              <span>Repository Analysis</span>
            </div>
            <div className="stat-chip">
              <i className="fas fa-microchip"></i>
              <span>AI-Powered Insights</span>
            </div>
          </div>
        </div>
      </div>
     {/* want to add two buttons with the text
     want the button and and its paragaph to be side by side and the second button and its paragrah to be side by side */}
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6 space-x-4 shadow-sm">
  <div className="flex items-center justify-between">
    <p className="text-gray-700">
      Want to chat with AI about this repository?
    </p>
    <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
      Chat with AI
    </button>
  </div>

  <div className="flex items-center justify-between">
    <p className="text-gray-700">
      Want a quick AI-generated summary of this repository?
    </p>
    <button className="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
      Get AI Summary
    </button>
  </div>
</div>
      

      {/* Main Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <i className="fas fa-folder-open"></i>
          </div>
          <div className="stat-info">
            <h3>{data.total_files}</h3>
            <p>Total Files</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <i className="fas fa-code"></i>
          </div>
          <div className="stat-info">
            <h3>{data.total_lines.toLocaleString()}</h3>
            <p>Lines of Code</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <i className="fas fa-crown"></i>
          </div>
          <div className="stat-info">
            <h3>{data.main_language}</h3>
            <p>Main Language</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <i className="fas fa-cube"></i>
          </div>
          <div className="stat-info">
            <h3>{data.project_type}</h3>
            <p>Project Type</p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="two-columns">
        {/* Left Column */}
        <div className="left-column">
          {/* Language Distribution */}
          <div className="card">
            <div className="card-header">
              <i className="fas fa-chart-pie"></i>
              <h2>Language Distribution</h2>
            </div>
            <div className="language-bars">
              {topLanguages.map(([lang, percent]) => (
                <div key={lang} className="language-item">
                  <div className="language-label">
                    <span className="lang-name">{lang}</span>
                    <span className="lang-percent">{percent.toFixed(1)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${percent}%`, backgroundColor: getLanguageColor(lang) }}
                    ></div>
                  </div>
                </div>
              ))}
              {topLanguages.length === 0 && (
                <div className="empty-state">
                  <i className="fas fa-chart-simple"></i>
                  <p>No language data available</p>
                </div>
              )}
            </div>
          </div>

          {/* Code Complexity */}
          <div className="card">
            <div className="card-header">
              <i className="fas fa-gauge-high"></i>
              <h2>Code Complexity</h2>
            </div>
            <div className="complexity-display">
              <div className="complexity-icon" style={{ backgroundColor: `${complexityStyle.color}20`, color: complexityStyle.color }}>
                <i className={`fas ${complexityStyle.icon}`}></i>
              </div>
              <div className="complexity-text">
                <span className="complexity-level">{data.code_complexity}</span>
                <span className="complexity-desc">
                  {data.code_complexity === 'Low' && 'Well-structured, easy to maintain'}
                  {data.code_complexity === 'Medium' && 'Moderate complexity, some refactoring opportunities'}
                  {data.code_complexity === 'High' && 'Complex codebase, consider modularization'}
                  {!['Low','Medium','High'].includes(data.code_complexity) && 'Analysis complete'}
                </span>
              </div>
            </div>
          </div>

          {/* File Size Distribution */}
          <div className="card">
            <div className="card-header">
              <i className="fas fa-chart-simple"></i>
              <h2>File Size Distribution</h2>
            </div>
            <div className="distribution-stats">
              {fileSizeDistribution.map((item) => (
                <div key={item.label} className="dist-item">
                  <div className="dist-header">
                    <div className="dist-label">
                      <i className={`fas ${item.icon}`} style={{ color: item.color }}></i>
                      <span>{item.label}</span>
                    </div>
                    <span className="dist-value">{item.value}</span>
                  </div>
                  <div className="dist-bar">
                    <div 
                      className="dist-fill" 
                      style={{ 
                        width: totalComplexityFiles > 0 ? `${(item.value / totalComplexityFiles) * 100}%` : '0%',
                        backgroundColor: item.color 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Project Dependencies */}
          <div className="card">
            <div className="card-header">
              <i className="fas fa-boxes"></i>
              <h2>Dependencies</h2>
              <span className="badge">{data.project_dependencies?.length || 0} packages</span>
            </div>
            <div className="dependencies-list">
              {data.project_dependencies && data.project_dependencies.length > 0 ? (
                <div className="dep-tags">
                  {data.project_dependencies.slice(0, 12).map((dep, idx) => (
                    <span key={idx} className="dep-tag">
                      <i className="fas fa-cube"></i>
                      {dep}
                    </span>
                  ))}
                  {data.project_dependencies.length > 12 && (
                    <span className="dep-tag more">+{data.project_dependencies.length - 12} more</span>
                  )}
                </div>
              ) : (
                <div className="empty-state">
                  <i className="fas fa-box-open"></i>
                  <p>No dependencies detected</p>
                </div>
              )}
            </div>
          </div>

          {/* Extension Breakdown */}
          <div className="card">
            <div className="card-header">
              <i className="fas fa-file-code"></i>
              <h2>File Types</h2>
            </div>
            <div className="extensions-grid">
              {Object.entries(data.extensions)
                .filter(([_, count]) => count > 0)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 8)
                .map(([ext, count]) => (
                  <div key={ext} className="ext-item">
                    <i className={`fab ${getExtensionIcon(ext)}`}></i>
                    <span className="ext-name">{ext || 'other'}</span>
                    <span className="ext-count">{count}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <div className="card-header">
              <i className="fas fa-chart-line"></i>
              <h2>Quick Insights</h2>
            </div>
            <div className="insights-list">
              <div className="insight-item">
                <i className="fas fa-chart-simple green"></i>
                <div className="insight-content">
                  <span className="insight-label">Avg. Lines per File</span>
                  <span className="insight-value">
                    {data.total_files > 0 ? Math.round(data.total_lines / data.total_files) : 0}
                  </span>
                </div>
              </div>
              <div className="insight-item">
                <i className="fas fa-layer-group blue"></i>
                <div className="insight-content">
                  <span className="insight-label">Language Diversity</span>
                  <span className="insight-value">
                    {Object.values(data.extensions).filter(v => v > 0).length}
                  </span>
                </div>
              </div>
              <div className="insight-item">
                <i className="fas fa-chart-line orange"></i>
                <div className="insight-content">
                  <span className="insight-label">Complexity Score</span>
                  <span className="insight-value">
                    {data.code_complexity === 'Low' ? '🟢 Low' : data.code_complexity === 'Medium' ? '🟡 Medium' : '🔴 High'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* File List Section (Collapsible / Expandable) */}
      <div className="card full-width">
        <div className="card-header">
          <i className="fas fa-list-tree"></i>
          <h2>Repository Structure</h2>
          <span className="badge">{data.files?.length || 0} items</span>
        </div>
        <div className="file-list">
          {data.files && data.files.length > 0 ? (
            <div className="file-grid">
              {data.files.slice(0, 30).map((file, idx) => (
                <div key={idx} className="file-item">
                  <i className={`fas ${getFileIcon(file)}`}></i>
                  <span className="file-name">{file}</span>
                </div>
              ))}
              {data.files.length > 30 && (
                <div className="more-files">
                  <i className="fas fa-ellipsis-h"></i>
                  <span>+{data.files.length - 30} more files</span>
                </div>
              )}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fas fa-folder-open"></i>
              <p>No file structure available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper functions for icons
function getLanguageColor(language) {
  const colors = {
    'Python': '#3572A5',
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Java': '#b07219',
    'Go': '#00ADD8',
    'Ruby': '#701516',
    'C++': '#f34b7d',
    'C': '#555555',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Markdown': '#083fa1',
    'Other': '#8257e5'
  };
  return colors[language] || '#6c757d';
}

function getExtensionIcon(ext) {
  const icons = {
    '.js': 'fa-js',
    '.jsx': 'fa-react',
    '.ts': 'fa-typescript',
    '.py': 'fa-python',
    '.java': 'fa-java',
    '.go': 'fa-golang',
    '.rb': 'fa-gem',
    '.cpp': 'fa-cplusplus',
    '.c': 'fa-c',
    '.html': 'fa-html5',
    '.css': 'fa-css3-alt',
    '.md': 'fa-markdown',
    '.json': 'fa-file-code'
  };
  return icons[ext] || 'fa-file-code';
}

function getFileIcon(filename) {
  if (filename.endsWith('.js')) return 'fa-js';
  if (filename.endsWith('.py')) return 'fa-python';
  if (filename.endsWith('.json')) return 'fa-file-code';
  if (filename.endsWith('.md')) return 'fa-markdown';
  if (filename.includes('/')) return 'fa-folder-open';
  return 'fa-file';
}

export default Analysis;