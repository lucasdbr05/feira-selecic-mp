export type LoginData = {
    email: string;
    password: string;
}

export type CreateUserData = {
  email: string;
  name: string;
  nickname: string;
  password: string;
  role: string;
  client?: CreateClientData;
}

export type CreateClientData = {
    cep: string
}

export enum Role {
    CLIENT = "CLIENT", 
    SELLER = "SELLER",
    ADMIN = "ADMIN",
}