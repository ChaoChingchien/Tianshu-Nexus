"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowUpStatusLabel = exports.FollowUpTypeLabel = exports.FollowUpStatus = exports.FollowUpType = void 0;
var FollowUpType;
(function (FollowUpType) {
    FollowUpType["ONLINE"] = "ONLINE";
    FollowUpType["OUTPATIENT"] = "OUTPATIENT";
    FollowUpType["PHONE"] = "PHONE";
})(FollowUpType || (exports.FollowUpType = FollowUpType = {}));
var FollowUpStatus;
(function (FollowUpStatus) {
    FollowUpStatus["PENDING"] = "PENDING";
    FollowUpStatus["COMPLETED"] = "COMPLETED";
    FollowUpStatus["MISSED"] = "MISSED";
})(FollowUpStatus || (exports.FollowUpStatus = FollowUpStatus = {}));
exports.FollowUpTypeLabel = {
    [FollowUpType.ONLINE]: '线上随访',
    [FollowUpType.OUTPATIENT]: '门诊随访',
    [FollowUpType.PHONE]: '电话随访',
};
exports.FollowUpStatusLabel = {
    [FollowUpStatus.PENDING]: '待执行',
    [FollowUpStatus.COMPLETED]: '已完成',
    [FollowUpStatus.MISSED]: '已错过',
};
//# sourceMappingURL=followup-status.enum.js.map