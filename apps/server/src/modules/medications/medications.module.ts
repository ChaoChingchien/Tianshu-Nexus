import { Module } from '@nestjs/common';
import { DrugDictionaryController } from './controllers/drug-dictionary.controller';
import { MedicationInventoryController } from './controllers/medication-inventory.controller';
import { DispensingController } from './controllers/dispensing.controller';
import { MedicationOrdersController } from './controllers/medication-orders.controller';
import { DrugDictionaryService } from './services/drug-dictionary.service';
import { MedicationInventoryService } from './services/medication-inventory.service';
import { DispensingService } from './services/dispensing.service';
import { MedicationOrdersService } from './services/medication-orders.service';

@Module({
  controllers: [
    DrugDictionaryController,
    MedicationInventoryController,
    DispensingController,
    MedicationOrdersController,
  ],
  providers: [
    DrugDictionaryService,
    MedicationInventoryService,
    DispensingService,
    MedicationOrdersService,
  ],
  exports: [
    DrugDictionaryService,
    MedicationInventoryService,
    DispensingService,
    MedicationOrdersService,
  ],
})
export class MedicationsModule {}
