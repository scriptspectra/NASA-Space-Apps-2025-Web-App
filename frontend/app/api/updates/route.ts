// app/api/news/route.ts
import Parser from 'rss-parser'

export async function GET() {
  const parser = new Parser()
  const feed = await parser.parseURL('https://www.sciencedaily.com/rss/space_time/extrasolar_planets.xml')
  
  // Return the top 10 articles
  const latest = feed.items?.slice(0, 10).map(item => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    content: item.contentSnippet || '',
  }))

  return new Response(JSON.stringify(latest), {
    headers: { 'Content-Type': 'application/json' }
  })
}
