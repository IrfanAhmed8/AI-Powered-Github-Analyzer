import React from "react";
import {  Link2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] to-[#161b22] text-white flex items-center justify-center px-4">
      
      {/* MAIN CARD */}
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
        
        {/* TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            AI GitHub Repository Analyzer
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Analyze repositories instantly with AI insights, summaries, and code intelligence.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="space-y-6">
          
          {/* CONNECT GITHUB BUTTON */}
          <button
  onClick={() => {
    window.location.href = "http://localhost:8000/auth/github/login";
  }}
  className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-gray-700 transition"
>
  <FaGithub className="w-5 h-5" />
  Connect your GitHub
</button>

          {/* DIVIDER */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* INPUT BOX */}
          <div className="flex items-center bg-white/5 border border-gray-700 rounded-xl overflow-hidden">
            <div className="px-3 text-gray-400">
              <Link2 size={18} />
            </div>
            <input
              type="text"
              placeholder="Paste GitHub repository link..."
              className="flex-1 bg-transparent px-2 py-3 outline-none text-sm md:text-base"
            />
            <button className="px-5 py-3 bg-blue-600 hover:bg-blue-700 transition">
              Analyze
            </button>
          </div>
        </div>

        {/* FOOTER NOTE */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Supports public repositories • Private repos via GitHub auth
        </p>
      </div>
    </div>
  );
}

export default Home;