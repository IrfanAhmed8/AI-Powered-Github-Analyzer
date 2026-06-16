import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, GitBranch, Code, FileCode, BarChart3, Layers, Activity } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

export default function AllRepo() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setLoading(true);
      fetch(`http://localhost:8000/repos?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          setRepos(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [token]);

  // Mock analysis data - replace with actual API call
  const getRepoAnalysis = (repo) => {
    return {
      languages: {
        "JavaScript": 45,
        "Python": 30,
        "TypeScript": 15,
        "HTML": 10
      },
      stats: {
        totalFiles: 127,
        totalLines: 8450,
        commits: 342,
        branches: 5,
        contributors: 12,
        lastUpdated: "2 days ago"
      },
      structure: {
        directories: 23,
        files: 104,
        configFiles: 8
      }
    };
  };

  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);
    // In production, fetch analysis data here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0d1117] to-[#161b22] text-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400 text-lg">
          Loading repositories...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] to-[#161b22] text-white">
      
      {/* HEADER */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-white/5 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Github className="w-5 h-5" />
          Repository Analysis
        </div>

        {/* SEARCH BAR */}
        <div className="hidden md:flex items-center bg-white/5 border border-gray-700 rounded-xl px-3 py-2 w-72">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search repos..."
            className="bg-transparent outline-none px-2 text-sm w-full text-gray-200"
          />
        </div>
      </div>

      {/* MAIN CONTENT - Split Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        
        {/* LEFT PANEL - Analysis Visualization */}
        <div className="flex-1 overflow-y-auto px-6 py-8 border-r border-gray-800">
          {selectedRepo ? (
            <div className="space-y-6">
              {/* Repo Name */}
              <div className="flex items-center gap-3">
                <Github className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">
                  {typeof selectedRepo === "string" ? selectedRepo : selectedRepo.name}
                </h2>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                  Active
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <FileCode size={16} />
                    Total Files
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {getRepoAnalysis(selectedRepo).stats.totalFiles}
                  </p>
                </div>
                <div className="bg-white/5 border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Code size={16} />
                    Lines of Code
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {getRepoAnalysis(selectedRepo).stats.totalLines.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white/5 border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <GitBranch size={16} />
                    Branches
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {getRepoAnalysis(selectedRepo).stats.branches}
                  </p>
                </div>
                <div className="bg-white/5 border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Activity size={16} />
                    Contributors
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {getRepoAnalysis(selectedRepo).stats.contributors}
                  </p>
                </div>
                <div className="bg-white/5 border border-gray-800 rounded-xl p-4 col-span-2">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Layers size={16} />
                    Repository Structure
                  </div>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <span className="text-blue-400">{getRepoAnalysis(selectedRepo).structure.directories}</span>
                      <span className="text-gray-500 text-sm">dirs</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-green-400">{getRepoAnalysis(selectedRepo).structure.files}</span>
                      <span className="text-gray-500 text-sm">files</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-purple-400">{getRepoAnalysis(selectedRepo).structure.configFiles}</span>
                      <span className="text-gray-500 text-sm">config</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Language Breakdown */}
              <div className="bg-white/5 border border-gray-800 rounded-xl p-5">
                <h3 className="text-sm font-medium text-gray-400 mb-4">Languages Used</h3>
                <div className="space-y-3">
                  {Object.entries(getRepoAnalysis(selectedRepo).languages).map(([lang, percentage]) => (
                    <div key={lang}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{lang}</span>
                        <span className="text-gray-500">{percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Last Updated */}
              <div className="text-right text-sm text-gray-500">
                Last updated: {getRepoAnalysis(selectedRepo).stats.lastUpdated}
              </div>
            </div>
          ) : (
            // Empty State for Left Panel
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <BarChart3 size={64} className="mb-4 opacity-20" />
              <p className="text-lg">Select a repository to view analysis</p>
              <p className="text-sm">Click on any repository from the right panel</p>
            </div>
          )}
        </div>

        {/* RIGHT PANEL - Repository List with Scroll */}
        <div className="w-full md:w-[420px] lg:w-[480px] xl:w-[520px] flex flex-col">
          <div className="px-4 py-3 border-b border-gray-800 bg-white/5">
            <span className="text-sm font-medium text-gray-400">
              {repos.length} Repositories
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {repos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>No repositories found</p>
              </div>
            ) : (
              repos.map((repo, index) => {
                const isSelected = selectedRepo === repo;
                return (
                  <div
                    key={repo.id || index}
                    onClick={() => handleRepoClick(repo)}
                    className={`
                      bg-white/5 border rounded-xl p-4 
                      hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 
                      transition-all duration-300 cursor-pointer
                      ${isSelected 
                        ? 'border-blue-500 shadow-lg shadow-blue-500/20 bg-blue-500/10' 
                        : 'border-gray-800'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white truncate">
                          {typeof repo === "string" ? repo : repo.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {repo.description || "No description available"}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 ml-3 whitespace-nowrap mt-1">
                        Public
                      </span>
                    </div>
                    
                    {/* Quick stats mini view */}
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FileCode size={12} />
                        {Math.floor(Math.random() * 100) + 10} files
                      </span>
                      <span className="flex items-center gap-1">
                        <GitBranch size={12} />
                        {Math.floor(Math.random() * 5) + 1} branches
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}