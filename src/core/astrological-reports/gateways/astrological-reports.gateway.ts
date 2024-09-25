import axios, { AxiosInstance } from 'axios';

export class AstrologicalReportsGateway {
  private readonly http: AxiosInstance;

  constructor(baseUrl: string) {
    this.http = axios.create({
      baseURL: baseUrl,
    });
  }

  async send(userId: string) {
    await this.http.get(
      'v1/forecast?latitude=52.52&longitude=13.41&past_days=10&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m',
    );
  }
}
