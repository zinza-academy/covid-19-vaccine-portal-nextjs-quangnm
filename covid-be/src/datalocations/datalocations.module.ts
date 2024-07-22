import { Module } from '@nestjs/common';
import { DatalocationsService } from './service/datalocations.service';
import { DatalocationsController } from './controller/datalocations.controller';

@Module({
  controllers: [DatalocationsController],
  providers: [DatalocationsService],
})
export class DatalocationsModule {}
