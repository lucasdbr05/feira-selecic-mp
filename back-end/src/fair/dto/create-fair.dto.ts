import { PickType } from '@nestjs/mapped-types';
import { FairEntity } from '../entities/fair.entity';

export class CreateFairDto extends PickType(FairEntity, ['name', 'cep']) {}
