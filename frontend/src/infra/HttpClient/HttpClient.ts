//TODO transform this to axios
// Hexagonal Architecture -- Ports and Adapters

interface HttpOptions {
  body?: any
  method: string
  headers?: any
}

interface HttpResponse {
  body: any
  ok: boolean
}

export async function HttpClient(
  url: string,
  options: HttpOptions,
): Promise<HttpResponse> {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
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
