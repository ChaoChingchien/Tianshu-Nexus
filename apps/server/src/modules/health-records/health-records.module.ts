import { Module } from '@nestjs/common';
import { HealthRecordsController } from './health-records.controller';
import { HealthRecordsService } from './health-records.service';

@Module({
  controllers: [HealthRecordsController],
  providers: [HealthRecordsService],
  exports: [HealthRecordsService],
})
export class HealthRecordsModule {}
