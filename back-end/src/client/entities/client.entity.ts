import { Client } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class ClientEntity implements Client {
  @IsNumber()
  id: number;

  @IsString()
  cep: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
