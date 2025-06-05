import { app } from './server';
import { AddressInfo } from 'net';
import http from 'node:http';

describe('API proxy', () => {
  let server: http.Server;
  let port: number;

  beforeEach(() => {
    server = app.listen(0);
    port = (server.address() as AddressInfo).port;
  });

  afterEach(() => {
    server.close();
  });

  it('forwards requests to the Rick and Morty API', async () => {
    const mockData = { success: true };
    const fetchSpy = jest
      .spyOn(global, 'fetch' as any)
      .mockResolvedValue(
        new Response(JSON.stringify(mockData), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }) as any,
      );

    const result = await new Promise<{ status?: number; body: string }>((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}/api/character`, res => {
        let data = '';
        res.on('data', chunk => (data += chunk));
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
      }).on('error', reject);
    });

    expect(fetchSpy).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character');
    expect(result.status).toBe(200);
    expect(result.body).toBe(JSON.stringify(mockData));
    fetchSpy.mockRestore();
  });
});
