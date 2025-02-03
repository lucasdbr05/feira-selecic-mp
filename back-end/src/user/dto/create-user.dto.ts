import { PickType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto extends PickType(UserEntity, [
  'email',
  'name',
  'nickname',
  'password',
  'role',
]) {}
