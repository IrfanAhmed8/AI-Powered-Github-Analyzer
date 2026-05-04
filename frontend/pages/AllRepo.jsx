import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {  Search } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

export default function AllRepo() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:8000/repos?token=${token}`)
        .then((res) => res.json())
        .then((data) => setRepos(data));
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] to-[#161b22] text-white">
      
      {/* HEADER */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/5 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Github className="w-5 h-5" />
          Your Repositories
        </div>

        {/* SEARCH BAR (UI only) */}
        <div className="hidden md:flex items-center bg-white/5 border border-gray-700 rounded-xl px-3 py-2 w-72">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search repos..."
            className="bg-transparent outline-none px-2 text-sm w-full"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 md:px-10 py-8">
        
        {repos.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
            <div className="animate-pulse text-sm">
              Fetching your repositories...
            </div>
          </div>
        ) : (
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            {repos.map((repo, index) => (
              <div
                key={repo.id || index}
                className="bg-white/5 border border-gray-800 rounded-2xl p-5 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition duration-300 cursor-pointer"
              >
                {/* REPO NAME */}
                <h3 className="text-lg font-semibold mb-2 break-words">
                  {typeof repo === "string" ? repo : repo.name}
                </h3>

                {/* DESCRIPTION PLACEHOLDER */}
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {repo.description || "No description available"}
                </p>

                {/* FOOTER */}
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Public</span>
                  <span className="text-blue-400 hover:underline">
                    View →
                  </span>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}