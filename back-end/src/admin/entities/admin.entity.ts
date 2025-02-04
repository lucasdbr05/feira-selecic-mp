import { Admin } from '@prisma/client';
import { IsNumber } from 'class-validator';

export class AdminEntity implements Admin {
  @IsNumber()
  id: number;
}
