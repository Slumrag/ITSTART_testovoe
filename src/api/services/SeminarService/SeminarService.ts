import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiSeminar } from '@api/types';

class SeminarService {
  axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:3000/seminars',
    });
  }
  async get(): Promise<AxiosResponse<ApiSeminar[]>> {
    return this.axios.request({ method: 'get' });
  }
  async getById(id: number): Promise<AxiosResponse<ApiSeminar>> {
    return this.axios.request({ method: 'get', url: id.toString() });
  }
  async delete(id: number) {
    return this.axios.request({ method: 'delete', url: id.toString() });
  }
  async patch(id: number, item: Omit<Partial<ApiSeminar>, 'id'>) {
    return this.axios.request({ method: 'patch', url: id.toString(), data: item });
  }
}

export const seminarService = new SeminarService();
