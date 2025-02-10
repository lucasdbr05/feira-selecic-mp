import { CreateUserData, FairsData, LoginData, UserStored } from "./types";
import { apiClient } from "./wrapper";

const api = apiClient
export class Api {
    async createUser(data: CreateUserData) {
        return await api.post("/auth/signup", data)
    } 

    async login(data: LoginData) {
        return await api.post("/auth/login", data)
    }

    async logout() {
        return await api.post("/auth/logout", {})
    }

    async getUserActive() {
        return await api.get<UserStored>("/auth/active")
    }

    async getFairs() {
        return await api.get<FairsData[]>("/fair")
    }
}