import { PartialType } from '@nestjs/mapped-types';
import { CreateFairDto } from './create-fair.dto';

export class UpdateFairDto extends PartialType(CreateFairDto) {}
