"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleLabel = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["DOCTOR"] = "DOCTOR";
    Role["NURSE"] = "NURSE";
    Role["PATIENT"] = "PATIENT";
})(Role || (exports.Role = Role = {}));
exports.RoleLabel = {
    [Role.ADMIN]: '管理员',
    [Role.DOCTOR]: '医生',
    [Role.NURSE]: '护士',
    [Role.PATIENT]: '患者',
};
//# sourceMappingURL=role.enum.js.map