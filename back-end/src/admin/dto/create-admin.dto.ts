import { PickType } from '@nestjs/mapped-types';
import { AdminEntity } from '../entities/admin.entity';

export class CreateAdminDto extends PickType(AdminEntity, ['id']) {}
