import { User } from '@prisma/client';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class UserEntity implements User {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  nickname: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
