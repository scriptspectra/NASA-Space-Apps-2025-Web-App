import { callPrivateService } from '@/lib/callPrivateService'

export async function GET() {
  const backendUrl = 'https://backend-452601381743.us-central1.run.app/some-endpoint'

  try {
    const data = await callPrivateService(backendUrl)
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
