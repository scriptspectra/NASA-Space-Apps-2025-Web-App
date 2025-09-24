'use client'
import React, { useEffect, useState } from 'react'
import ExoplanetCard from './ExoplanetCard'
import NewsCard from './NewsCard'

type NewsItem = {
  title: string
  link: string
  pubDate: string
  content: string
}

const ExoplanetNews = () => {
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch('/api/updates')
      const data = await res.json()
      setNews(data)
    }

    fetchNews()
    const interval = setInterval(fetchNews, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Latest Exoplanet News</h2>
      {news.length === 0 && <p>Loading...</p>}
      <div className="grid md:grid-cols-3 gap-4 gap-y-3">
        {news.map((item, i) => (
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
  )
}

export default ExoplanetNews
