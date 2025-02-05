import { PickType } from '@nestjs/mapped-types';
import { ProductEntity } from '../entities/product.entity';

export class CreateProductDto extends PickType(ProductEntity, [
  'name',
  'price',
  'shopId',
]) {}
