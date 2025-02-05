import { CreateUserData, LoginData } from "./types";
import { apiClient } from "./wrapper";

const api = apiClient
export class Api {
    async createUser(data: CreateUserData) {
        return api.post("/auth/signup", data)
    } 

    async login(data: LoginData) {
        return api.post("/auth/login", data)
    }
}