"use client";

import { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    const starsContainer = document.getElementById("stars");
    if (!starsContainer) return;

    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "absolute bg-white rounded-full opacity-70 twinkle";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      const size = Math.random() * 2 + 1 + "px";
      star.style.width = size;
      star.style.height = size;
      star.style.animationDelay = Math.random() * 3 + "s";
      star.style.animationDuration = Math.random() * 3 + 2 + "s";
      starsContainer.appendChild(star);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#212121] text-[#e0e6ed] overflow-x-hidden">
      {/* Starfield background */}
      <div id="stars" className="absolute inset-0 z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-5">
        {/* Header */}
        <header className="text-center py-16 bg-gradient-to-b from-indigo-600/10 to-transparent rounded-2xl mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 bg-clip-text text-transparent animate-fadeInDown">
            Xplora
          </h1>
          <p className="text-lg text-slate-400 mt-4 animate-fadeIn">
            Bridging Exoplanet Research and Public Engagement
          </p>
        </header>

        {/* Mission */}
        <section className="bg-slate-800/60 backdrop-blur-xl border border-slate-400/20 rounded-xl p-10 mb-12 animate-fadeInUp">
          <h2 className="text-2xl text-blue-400 mb-4">Our Mission</h2>
          <p className="text-slate-300 leading-relaxed">
            Xplora is a cutting-edge web application designed to democratize access to exoplanet research. We bridge the gap between complex astronomical data and public understanding, making NASA's TESS and Kepler mission discoveries accessible to everyone. Whether you're a curious enthusiast or a dedicated researcher, Xplora provides the tools and insights you need to explore worlds beyond our solar system.
          </p>
        </section>

        {/* Features */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {[
            {
              title: "Explore Data",
              text: "Access and visualize real data from NASA's TESS and Kepler missions...",
            },
            {
              title: "AI Predictions",
              text: "Leverage machine learning models to make predictions about potential exoplanets...",
            },
            {
              title: "Visual Analytics",
              text: "Understand complex astronomical data through intuitive visualizations...",
            },
            {
              title: "Learn & Discover",
              text: "Educational resources and interactive tutorials help you understand detection methods...",
            },
            {
              title: "Community Driven",
              text: "Join a community of space enthusiasts and researchers. Share insights and discuss findings.",
            },
            {
              title: "Real-Time Updates",
              text: "Stay current with the latest exoplanet discoveries and mission updates.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-slate-800/50 backdrop-blur-lg border border-slate-400/20 rounded-xl p-8 transition transform hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-400/20 animate-fadeInUp"
            >
              <h3 className="text-xl text-blue-400 mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </section>

        {/* Data Sources */}
        <section className="bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-xl p-10 mb-12 animate-fadeIn">
          <h2 className="text-2xl text-blue-400 text-center mb-8">Data Sources</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "TESS Mission",
                text: "Transiting Exoplanet Survey Satellite data providing all-sky surveys and detailed observations.",
              },
              {
                title: "Kepler Mission",
                text: "Legacy data from NASA's Kepler Space Telescope, discovering thousands of exoplanets.",
              },
              {
                title: "NASA Exoplanet Archive",
                text: "Comprehensive database of confirmed exoplanets, planetary candidates, and stellar parameters.",
              },
            ].map((src, idx) => (
              <div
                key={idx}
                className="bg-slate-800/60 p-6 rounded-lg border-l-4 border-blue-400 transition transform hover:border-blue-500 hover:translate-x-1"
              >
                <h4 className="text-blue-400 mb-2 text-lg">{src.title}</h4>
                <p className="text-slate-400 text-sm">{src.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 animate-fadeInUp">
          <h2 className="text-3xl text-blue-400 mb-4">Ready to Explore the Cosmos?</h2>
          <p className="text-slate-300 mb-6">Start your journey into exoplanet discovery today</p>
          <a
            href="#"
            className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-1 transition"
          >
            Get Started
          </a>
        </section>
      </div>
    </div>
  );
}
