"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentStatusLabel = exports.AppointmentStatus = void 0;
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["CONFIRMED"] = "CONFIRMED";
    AppointmentStatus["CHECKED_IN"] = "CHECKED_IN";
    AppointmentStatus["CANCELLED"] = "CANCELLED";
    AppointmentStatus["COMPLETED"] = "COMPLETED";
    AppointmentStatus["NO_SHOW"] = "NO_SHOW";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
exports.AppointmentStatusLabel = {
    [AppointmentStatus.CONFIRMED]: '已确认',
    [AppointmentStatus.CHECKED_IN]: '已签到',
    [AppointmentStatus.CANCELLED]: '已取消',
    [AppointmentStatus.COMPLETED]: '已完成',
    [AppointmentStatus.NO_SHOW]: '未到诊',
};
//# sourceMappingURL=appointment-status.enum.js.map