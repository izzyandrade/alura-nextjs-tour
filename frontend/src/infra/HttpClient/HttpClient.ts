//TODO transform this to axios
// Hexagonal Architecture -- Ports and Adapters

interface HttpRequest {
  body?: any
  method: string
  headers?: any
}

interface HttpResponse {
  body: any
  ok: boolean
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export async function HttpClient(
  url: string,
  options: HttpRequest,
): Promise<HttpResponse> {
  return fetch(`${baseUrl + url}`, {
    ...options,
    body: options.body ? JSON.stringify(options.body) : null,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }).then(async (res) => {
    return {
      body: await res.json(),
      ok: res.ok,
    }
  })
}
