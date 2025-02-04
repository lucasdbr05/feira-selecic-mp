import { PickType } from '@nestjs/mapped-types';
import { SellerEntity } from '../entities/seller.entity';

export class CreateSellerDto extends PickType(SellerEntity, ['id']) {}
