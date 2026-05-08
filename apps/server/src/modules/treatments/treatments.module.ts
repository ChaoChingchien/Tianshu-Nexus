import { Module } from '@nestjs/common';
import { TreatmentCatalogController } from './controllers/treatment-catalog.controller';
import { AcupointsController } from './controllers/acupoints.controller';
import { TechniquesController } from './controllers/techniques.controller';
import { TcmTreatmentsController } from './controllers/tcm-treatments.controller';
import { TreatmentPlansController } from './controllers/treatment-plans.controller';
import { TreatmentCatalogService } from './services/treatment-catalog.service';
import { AcupointsService } from './services/acupoints.service';
import { TechniquesService } from './services/techniques.service';
import { TcmTreatmentsService } from './services/tcm-treatments.service';
import { TreatmentPlansService } from './services/treatment-plans.service';

@Module({
  controllers: [
    TreatmentCatalogController,
    AcupointsController,
    TechniquesController,
    TcmTreatmentsController,
    TreatmentPlansController,
  ],
  providers: [
    TreatmentCatalogService,
    AcupointsService,
    TechniquesService,
    TcmTreatmentsService,
    TreatmentPlansService,
  ],
  exports: [
    TreatmentCatalogService,
    AcupointsService,
    TechniquesService,
    TcmTreatmentsService,
    TreatmentPlansService,
  ],
})
export class TreatmentsModule {}
