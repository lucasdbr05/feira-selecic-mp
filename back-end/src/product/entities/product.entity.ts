import { Product } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductEntity implements Product {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  shopId: number;
}
