"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientCategoryLabel = exports.PatientCategory = void 0;
var PatientCategory;
(function (PatientCategory) {
    PatientCategory["INPATIENT"] = "INPATIENT";
    PatientCategory["OUTPATIENT"] = "OUTPATIENT";
    PatientCategory["CHARITY"] = "CHARITY";
})(PatientCategory || (exports.PatientCategory = PatientCategory = {}));
exports.PatientCategoryLabel = {
    [PatientCategory.INPATIENT]: '住院',
    [PatientCategory.OUTPATIENT]: '门诊',
    [PatientCategory.CHARITY]: '慈善',
};
//# sourceMappingURL=patient-category.enum.js.map