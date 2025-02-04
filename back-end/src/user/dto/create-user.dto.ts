import { PickType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';
import { CreateClientDto } from '../../client/dto/create-client.dto';

export class CreateUserDto extends PickType(UserEntity, [
  'email',
  'name',
  'nickname',
  'password',
  'role',
]) {}

export class CreateUserWithRole extends CreateUserDto {
  client?: Omit<CreateClientDto, 'id'>;
}
