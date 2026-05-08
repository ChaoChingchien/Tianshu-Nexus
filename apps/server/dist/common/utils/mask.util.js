"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskField = maskField;
exports.maskPatientData = maskPatientData;
const shared_1 = require("@tianshu/shared");
function maskField(field, value) {
    if (!value)
        return null;
    const rule = shared_1.MASK_RULES[field];
    if (rule)
        return rule(value);
    return value;
}
function maskPatientData(data) {
    const sensitiveFields = ['name', 'phone', 'idNumber'];
    const result = { ...data };
    for (const field of sensitiveFields) {
        if (result[field] && typeof result[field] === 'string') {
            result[field] = maskField(field, result[field]);
        }
    }
    return result;
}
//# sourceMappingURL=mask.util.js.map