// /app/api/backend/[...path]/route.ts
import { callPrivateService } from '@/lib/callPrivateService'

async function handleRequest(req: Request, params: { path: string[] }) {
  try {
    const path = params.path.join('/')
    const backendUrl = `${process.env.BACKEND_URL}/${path}`

    const body = req.method !== 'GET' ? await req.json() : undefined

    const data = await callPrivateService(backendUrl, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body,
    })

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Backend call failed:', error.response?.data || error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// Forward all HTTP methods
export async function GET(req: Request, ctx: { params: { path: string[] } }) {
  return handleRequest(req, ctx.params)
}
export async function POST(req: Request, ctx: { params: { path: string[] } }) {
  return handleRequest(req, ctx.params)
}
export async function PUT(req: Request, ctx: { params: { path: string[] } }) {
  return handleRequest(req, ctx.params)
}
export async function DELETE(req: Request, ctx: { params: { path: string[] } }) {
  return handleRequest(req, ctx.params)
}
