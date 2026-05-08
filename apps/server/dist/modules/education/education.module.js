"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationModule = void 0;
const common_1 = require("@nestjs/common");
const articles_controller_1 = require("./controllers/articles.controller");
const patient_groups_controller_1 = require("./controllers/patient-groups.controller");
const articles_service_1 = require("./services/articles.service");
const patient_groups_service_1 = require("./services/patient-groups.service");
let EducationModule = class EducationModule {
};
exports.EducationModule = EducationModule;
exports.EducationModule = EducationModule = __decorate([
    (0, common_1.Module)({
        controllers: [articles_controller_1.ArticlesController, patient_groups_controller_1.PatientGroupsController],
        providers: [articles_service_1.ArticlesService, patient_groups_service_1.PatientGroupsService],
        exports: [articles_service_1.ArticlesService, patient_groups_service_1.PatientGroupsService],
    })
], EducationModule);
//# sourceMappingURL=education.module.js.map