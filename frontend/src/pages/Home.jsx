import React, { useRef } from "react";
import { Link2, Sparkles, Zap, Shield } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Home() {
  const inputRef = useRef();

  const navigate = useNavigate();

async function analyzeRepo(repoLink) {
  const response = await fetch("http://localhost:8000/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      repo_url: repoLink,
    }),
  });
  console.log("Sent repo link for analysis:", repoLink);

  const data = await response.json();

  localStorage.setItem(
    "analysis",
    JSON.stringify(data.analysis)
  );

  navigate("/analysis");
}
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d1117] text-white">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 blur-[120px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-7xl">
          {/* HERO */}
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm mb-6">
              <Sparkles size={16} />
              AI Powered Repository Intelligence
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
              Understand Any
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                GitHub Repository
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-center text-base md:text-lg text-gray-400 leading-relaxed">
              Get architecture breakdowns, code summaries, dependency insights,
              and AI-generated documentation in seconds.
            </p>
          </div>

          {/* MAIN CARD */}
          <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12">
            {/* FEATURES */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="flex justify-center mb-3">
                  <Zap className="text-yellow-400" size={28} />
                </div>
                <h3 className="font-semibold text-white mb-1.5">Instant Analysis</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Understand large codebases quickly.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="flex justify-center mb-3">
                  <Sparkles className="text-blue-400" size={28} />
                </div>
                <h3 className="font-semibold text-white mb-1.5">AI Summaries</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Auto-generated architecture insights.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="flex justify-center mb-3">
                  <Shield className="text-green-400" size={28} />
                </div>
                <h3 className="font-semibold text-white mb-1.5">Private Repo Support</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Secure GitHub authentication.
                </p>
              </div>
            </div>

            {/* GITHUB BUTTON */}
            <button
              onClick={() => {
                window.location.href =
                  "http://localhost:8000/auth/github/login";
              }}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#24292f] hover:bg-[#2f363d] border border-gray-700 transition-all duration-300 font-medium text-white"
            >
              <FaGithub size={20} />
              Connect GitHub Account
            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 my-10">
              <div className="flex-1 h-px bg-gray-800" />
              <span className="text-gray-500 text-sm font-medium px-2 whitespace-nowrap">
                OR ANALYZE DIRECTLY
              </span>
              <div className="flex-1 h-px bg-gray-800" />
            </div>

            {/* INPUT */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center rounded-2xl border border-gray-700 bg-black/20 px-4 focus-within:border-blue-500/50 transition-colors">
                <Link2 size={18} className="text-gray-500 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="https://github.com/user/repository"
                  className="w-full bg-transparent px-3 py-4 outline-none text-gray-200 placeholder:text-gray-500 text-sm md:text-base"
                />
              </div>

              <button
                onClick={() => analyzeRepo(inputRef.current.value)}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition-all font-semibold shadow-lg shadow-blue-600/20 whitespace-nowrap text-white text-sm md:text-base"
              >
                Analyze Repository
              </button>
            </div>

            {/* FOOTER */}
            <p className="text-center text-sm text-gray-500 mt-10">
              Supports public repositories • Secure GitHub OAuth for private
              repositories
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;