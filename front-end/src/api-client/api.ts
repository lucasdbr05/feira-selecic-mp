import api from "./client";
import { CreateUserData } from "./types";
import { apiClient } from "./wrapper";

const api = apiClient
export class Api {
    async createUser(data: CreateUserData) {
        console.log(data)
        return api.post("/auth/signup", data)
    } 
}