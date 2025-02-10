import { PickType } from '@nestjs/mapped-types';
import { SellerEntity } from '../entities/seller.entity';
import { CreateShopDto } from '../../shop/dto/create-shop.dto';

export class CreateSellerDto extends PickType(SellerEntity, ['id']) {}

export class CreateFullSellerDto extends CreateSellerDto {
  shop: Partial<CreateShopDto>;
}
