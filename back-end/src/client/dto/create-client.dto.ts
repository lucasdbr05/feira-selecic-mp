import { PickType } from '@nestjs/mapped-types';
import { ClientEntity } from '../entities/client.entity';

export class CreateClientDto extends PickType(ClientEntity, [
  'id',
  'cep',
  'latitude',
  'longitude',
]) {}
