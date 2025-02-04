import { Seller } from '@prisma/client';
import { IsNumber } from 'class-validator';

export class SellerEntity implements Seller {
  @IsNumber()
  id: number;
}
