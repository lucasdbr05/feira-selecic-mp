import { Role, User } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UserEntity implements User {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  refreshToken: string;

  @IsEnum(Role)
  role: Role;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
