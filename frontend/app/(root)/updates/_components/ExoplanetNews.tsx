"use client";
import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  content: string;
};

const ExoplanetNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/updates");
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 60000);
    return () => clearInterval(interval);
  }, []);

  // Number of placeholder skeletons
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Latest Exoplanet News</h2>

      <div className="grid md:grid-cols-3 gap-4 gap-y-3">
        {loading
          ? skeletons.map((_, i) => (
              <div
                key={i}
                className="w-full h-65 dark:bg-[#2A2A2A] bg-[#EAE8DE] rounded-lg p-4 animate-pulse flex flex-col justify-between"
              >
              </div>
            ))
          : news.map((item, i) => (
              <NewsCard
                key={i}
                title={item.title}
                content={item.content}
                link={item.link}
                date={item.pubDate}
                source="NASA"
              />
            ))}
      </div>
    </div>
  );
};

export default ExoplanetNews;
