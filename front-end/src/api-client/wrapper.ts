import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

type AxiosRequestConfigWithHideToast = AxiosRequestConfig;
export interface ApiConfiguration {
  baseURL?: string;
  withCredentials: boolean;
}

export interface IApiClient {
  post<TRequest, TResponse>(
    path: string,
    object: TRequest,
    config?: AxiosRequestConfigWithHideToast
  ): Promise<TResponse>;
  patch<TRequest, TResponse>(
    path: string,
    object: TRequest
  ): Promise<TResponse>;
  put<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  get<TResponse>(path: string): Promise<TResponse>;
}

export default class ApiClient implements IApiClient {
  private client: AxiosInstance;

  protected createAxiosClient(
    apiConfiguration: ApiConfiguration
  ): AxiosInstance {
    return Axios.create(apiConfiguration);
  }

  constructor(apiConfiguration: ApiConfiguration) {
    this.client = this.createAxiosClient(apiConfiguration);
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config?: AxiosRequestConfigWithHideToast
  ): Promise<TResponse> {
    return await this.client
      .post<TResponse>(path, payload, config)
      .then((res) => res.data)
      .catch((err) => this.handleError(err));
  }

  async delete<TResponse>(
    path: string,
    config?: AxiosRequestConfigWithHideToast
  ): Promise<TResponse> {
    return await this.client
      .delete<TResponse>(path, config)
      .then((res) => res.data)
      .catch((err) => this.handleError(err));
  }

  async patch<TRequest, TResponse>(
    path: string,
    payload?: TRequest,
  ): Promise<TResponse> {
    return await this.client
      .patch<TResponse>(path, payload)
      .then((res) => res.data)
      .catch((err) => this.handleError(err));
  }

  async put<TRequest, TResponse>(
    path: string,
    payload: TRequest,
  ): Promise<TResponse> {
    return await this.client
      .put<TResponse>(path, payload)
      .then((res) => res.data)
      .catch((err) => this.handleError(err));
  }

  async get<TResponse>(
    path: string,
    config?: AxiosRequestConfigWithHideToast
  ): Promise<TResponse> {
    return await this.client
      .get<TResponse>(path, config)
      .then((res) => res.data)
      .catch((err) => this.handleError(err));
  }

  private handleError(error: any): never {
    throw error;
  }

  private extractErrorMessage(error): string {
    const data = error?.response?.data;
    const firstError = data?.errors?.[0];
    if (firstError) {
      if (typeof firstError.description === 'string')
        return firstError.description;

      if (firstError.property && firstError.errors?.[0])
        return `${firstError.property}: ${firstError.errors?.[0]}`;
    }

    if (typeof data?.message === 'string') return data?.message;

    if (typeof data?.message?.[0] === 'string') return data?.message?.[0];

    if (typeof data?.error === 'string') return data?.error;

    return 'Algo deu errado';
  }
}

/**
 * Axios instance of the API, already configured with basic setup
 */
export const apiClient = new ApiClient({
  baseURL: "http://localhost:3333",
  withCredentials: true, // enables cookies
});
