"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationsModule = void 0;
const common_1 = require("@nestjs/common");
const drug_dictionary_controller_1 = require("./controllers/drug-dictionary.controller");
const medication_inventory_controller_1 = require("./controllers/medication-inventory.controller");
const dispensing_controller_1 = require("./controllers/dispensing.controller");
const medication_orders_controller_1 = require("./controllers/medication-orders.controller");
const drug_dictionary_service_1 = require("./services/drug-dictionary.service");
const medication_inventory_service_1 = require("./services/medication-inventory.service");
const dispensing_service_1 = require("./services/dispensing.service");
const medication_orders_service_1 = require("./services/medication-orders.service");
let MedicationsModule = class MedicationsModule {
};
exports.MedicationsModule = MedicationsModule;
exports.MedicationsModule = MedicationsModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            drug_dictionary_controller_1.DrugDictionaryController,
            medication_inventory_controller_1.MedicationInventoryController,
            dispensing_controller_1.DispensingController,
            medication_orders_controller_1.MedicationOrdersController,
        ],
        providers: [
            drug_dictionary_service_1.DrugDictionaryService,
            medication_inventory_service_1.MedicationInventoryService,
            dispensing_service_1.DispensingService,
            medication_orders_service_1.MedicationOrdersService,
        ],
        exports: [
            drug_dictionary_service_1.DrugDictionaryService,
            medication_inventory_service_1.MedicationInventoryService,
            dispensing_service_1.DispensingService,
            medication_orders_service_1.MedicationOrdersService,
        ],
    })
], MedicationsModule);
//# sourceMappingURL=medications.module.js.map