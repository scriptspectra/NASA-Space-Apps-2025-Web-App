// /app/api/backend/[...path]/route.ts
import { callPrivateService } from '@/lib/callPrivateService'

export async function GET(req: Request, { params }: { params: { path: string[] } }) {
  try {
    const path = params.path.join('/') // reconstruct the backend path
    const backendUrl = `${process.env.BACKEND_URL}/${path}`

    const data = await callPrivateService(backendUrl, {
      method: 'GET',
      headers: {
        // Forward client headers if needed
        'Content-Type': 'application/json',
      },
    })

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Backend call failed:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
