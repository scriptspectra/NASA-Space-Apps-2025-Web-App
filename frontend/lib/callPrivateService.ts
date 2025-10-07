// lib/callPrivateService.ts
import { GoogleAuth } from 'google-auth-library'

export async function callPrivateService(url: string, options: any = {}) {
  const auth = new GoogleAuth()
  // Creates a client to mint an ID token for the private service
  const client = await auth.getIdTokenClient(url)

  const res = await client.request({
    url,
    method: options.method || 'GET',
    data: options.body || undefined,
    headers: options.headers || {},
  })

  return res.data
}
