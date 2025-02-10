export enum Role {
    CLIENT = "CLIENT", 
    SELLER = "SELLER",
    ADMIN = "ADMIN",
}

export type LoginData = {
    email: string;
    password: string;
}

export type CreateUserData = {
  email: string;
  name: string;
  password: string;
  role: string;
  client?: CreateClientData;
  seller?: {
    shop?: CreateShopData
  };
}

export type CreateClientData = {
    cep: string
}


export type CreateShopData = {
    fairId?: number,
    name?: string
}

export type UserStored = {
    id: number,
    email: string,
    name: string,
} 

export type ShopsData = any // TODO: create ShopsData type


export type FairsData = {
    id: number,
    name: number,
    cep: string,
    latitude: number,
    longitude: number,
    shops: ShopsData[],
}