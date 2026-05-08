"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveStatusLabel = exports.LeaveTypeLabel = exports.LeaveStatus = exports.LeaveType = void 0;
var LeaveType;
(function (LeaveType) {
    LeaveType["LEAVE"] = "LEAVE";
    LeaveType["OUTING"] = "OUTING";
})(LeaveType || (exports.LeaveType = LeaveType = {}));
var LeaveStatus;
(function (LeaveStatus) {
    LeaveStatus["PENDING_APPROVAL"] = "PENDING_APPROVAL";
    LeaveStatus["APPROVED"] = "APPROVED";
    LeaveStatus["REJECTED"] = "REJECTED";
})(LeaveStatus || (exports.LeaveStatus = LeaveStatus = {}));
exports.LeaveTypeLabel = {
    [LeaveType.LEAVE]: '请假',
    [LeaveType.OUTING]: '外出',
};
exports.LeaveStatusLabel = {
    [LeaveStatus.PENDING_APPROVAL]: '待审批',
    [LeaveStatus.APPROVED]: '已批准',
    [LeaveStatus.REJECTED]: '已拒绝',
};
//# sourceMappingURL=leave-status.enum.js.map