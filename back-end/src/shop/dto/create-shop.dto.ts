import { PickType } from '@nestjs/mapped-types';
import { ShopEntity } from '../entities/shop.entity';

export class CreateShopDto extends PickType(ShopEntity, [
  'name',
  'fairId',
  'sellerId',
  'categories',
  'isOpen',
]) {}
