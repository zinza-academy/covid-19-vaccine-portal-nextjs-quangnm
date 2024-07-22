import { PartialType } from '@nestjs/mapped-types';
import { CreateDatalocationDto } from './create-datalocation.dto';

export class UpdateDatalocationDto extends PartialType(CreateDatalocationDto) {}
