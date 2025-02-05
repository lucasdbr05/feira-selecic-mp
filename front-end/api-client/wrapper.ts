import { AxiosRequestConfig } from "axios";
import api from "./client";

export class ApiClient {
  
  constructor () {}

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    return await api
      .post<TResponse>(path, payload, config)
      .then((res) => res.data)
      .catch((err) => this.handleError(err));
  }

  async delete<TResponse>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    return await api
      .delete<TResponse>(path, config)
      .then((res) => res.data)
      .catch((err) => this.handleError(err));
  }

  async patch<TRequest, TResponse>(
    path: string,
    payload?: TRequest,
  ): Promise<TResponse> {
    return await api
      .patch<TResponse>(path, payload)
      .then((res) => res.data)
      .catch((err) => this.handleError(err));
  }

  async put<TRequest, TResponse>(
    path: string,
    payload: TRequest,
  ): Promise<TResponse> {
    return await api
      .put<TResponse>(path, payload)
      .then((res) => res.data)
      .catch((err) => this.handleError(err));
  }

  async get<TResponse>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    return await api
      .get<TResponse>(path, config)
      .then((res) => res.data)
      .catch((err) => this.handleError(err));
  }

  
  private handleError(error): never {
    throw error;
  }
}