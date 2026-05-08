"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentPlanStatusLabel = exports.TreatmentPlanStatus = void 0;
var TreatmentPlanStatus;
(function (TreatmentPlanStatus) {
    TreatmentPlanStatus["DRAFT"] = "DRAFT";
    TreatmentPlanStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TreatmentPlanStatus["COMPLETED"] = "COMPLETED";
    TreatmentPlanStatus["STOPPED"] = "STOPPED";
})(TreatmentPlanStatus || (exports.TreatmentPlanStatus = TreatmentPlanStatus = {}));
exports.TreatmentPlanStatusLabel = {
    [TreatmentPlanStatus.DRAFT]: '草稿',
    [TreatmentPlanStatus.IN_PROGRESS]: '执行中',
    [TreatmentPlanStatus.COMPLETED]: '已完成',
    [TreatmentPlanStatus.STOPPED]: '已停止',
};
//# sourceMappingURL=treatment-plan-status.enum.js.map