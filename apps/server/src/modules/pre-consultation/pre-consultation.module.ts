import { Module } from '@nestjs/common';
import { PreConsultationController } from './pre-consultation.controller';
import { PreConsultationService } from './pre-consultation.service';

@Module({
  controllers: [PreConsultationController],
  providers: [PreConsultationService],
  exports: [PreConsultationService],
})
export class PreConsultationModule {}
