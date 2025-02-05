import { CreateUserData, LoginData, UserStored } from "./types";
import { apiClient } from "./wrapper";

const api = apiClient
export class Api {
    async createUser(data: CreateUserData) {
        return api.post("/auth/signup", data)
    } 

    async login(data: LoginData) {
        return api.post("/auth/login", data)
    }

    async logout() {
        return api.post("/auth/logout", {})
    }

    async getUserActive() {
        return api.get<UserStored>("/auth/active")
    }
}