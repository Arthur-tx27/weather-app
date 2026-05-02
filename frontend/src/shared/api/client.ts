const BASE_URL = '/api';

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json() as Promise<T>;
  }
}

export const httpClient = new HttpClient();
