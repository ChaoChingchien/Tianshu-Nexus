"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentsModule = void 0;
const common_1 = require("@nestjs/common");
const treatment_catalog_controller_1 = require("./controllers/treatment-catalog.controller");
const acupoints_controller_1 = require("./controllers/acupoints.controller");
const techniques_controller_1 = require("./controllers/techniques.controller");
const tcm_treatments_controller_1 = require("./controllers/tcm-treatments.controller");
const treatment_plans_controller_1 = require("./controllers/treatment-plans.controller");
const treatment_catalog_service_1 = require("./services/treatment-catalog.service");
const acupoints_service_1 = require("./services/acupoints.service");
const techniques_service_1 = require("./services/techniques.service");
const tcm_treatments_service_1 = require("./services/tcm-treatments.service");
const treatment_plans_service_1 = require("./services/treatment-plans.service");
let TreatmentsModule = class TreatmentsModule {
};
exports.TreatmentsModule = TreatmentsModule;
exports.TreatmentsModule = TreatmentsModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            treatment_catalog_controller_1.TreatmentCatalogController,
            acupoints_controller_1.AcupointsController,
            techniques_controller_1.TechniquesController,
            tcm_treatments_controller_1.TcmTreatmentsController,
            treatment_plans_controller_1.TreatmentPlansController,
        ],
        providers: [
            treatment_catalog_service_1.TreatmentCatalogService,
            acupoints_service_1.AcupointsService,
            techniques_service_1.TechniquesService,
            tcm_treatments_service_1.TcmTreatmentsService,
            treatment_plans_service_1.TreatmentPlansService,
        ],
        exports: [
            treatment_catalog_service_1.TreatmentCatalogService,
            acupoints_service_1.AcupointsService,
            techniques_service_1.TechniquesService,
            tcm_treatments_service_1.TcmTreatmentsService,
            treatment_plans_service_1.TreatmentPlansService,
        ],
    })
], TreatmentsModule);
//# sourceMappingURL=treatments.module.js.map