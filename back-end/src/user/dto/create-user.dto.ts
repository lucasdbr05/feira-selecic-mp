import { PickType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';
import { CreateClientDto } from '../../client/dto/create-client.dto';
import { CreateFullSellerDto } from '../../seller/dto/create-seller.dto';

export class CreateUserDto extends PickType(UserEntity, [
  'email',
  'name',
  'password',
  'role',
]) {}

export class CreateUserWithRole extends CreateUserDto {
  client?: Pick<CreateClientDto, 'cep'>;
  seller?: Omit<CreateFullSellerDto, 'id'>;
}
