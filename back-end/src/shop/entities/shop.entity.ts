import { Shop } from '@prisma/client';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ShopEntity implements Shop {
  @IsNumber()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  fairId: number;

  @IsNumber()
  @IsNotEmpty()
  sellerId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  categories: any;

  @IsBoolean()
  isOpen: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
