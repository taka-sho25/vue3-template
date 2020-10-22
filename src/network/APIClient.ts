import axios from 'axios';
import { APIError } from './APIError';

class APIClient {
  axiosInstance: any;

  constructor() {
    this.axiosInstance = axios.create({
      timeout: 20000,
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  async getRequest(url: string, config?: any) {
    try {
      const res = await this.axiosInstance.get(url, config);
      return this.handleResponse(res);
    } catch (e) {
      const error = this._normalizeError(e);
      console.log(error);
    }
  }

  async postRequest(url: string, data?: any, config?: any) {
    try {
      const res = await this.axiosInstance.post(url, data, config);
      return this.handleResponse(res);
    } catch (e) {
      const error = this._normalizeError(e);
      console.log(error);
    }
  }

  private handleResponse(response: any) {
    const { data, status } = response;
    if (status === 200) {
      return data;
    }

    throw new Error(data);
  }

  private _normalizeError(error: any): APIError {
    return {
      status: error.response && error.response.status,
      message: error.message,
      raw: error,
    };
  }
}

export default new APIClient();
