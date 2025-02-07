import { Fair } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FairEntity implements Fair {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
