"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MASK_RULES = void 0;
/**
 * PII 脱敏规则
 */
exports.MASK_RULES = {
    /** 姓名：只显示第一个字 + "*" */
    name: (value) => {
        if (!value)
            return '';
        if (value.length <= 1)
            return value;
        return value[0] + '*'.repeat(value.length - 1);
    },
    /** 手机号：138****1234 */
    phone: (value) => {
        if (!value || value.length < 7)
            return value || '';
        return value.slice(0, 3) + '****' + value.slice(-4);
    },
    /** 身份证号：110***********1234 */
    idNumber: (value) => {
        if (!value || value.length < 8)
            return value || '';
        return value.slice(0, 3) + '***********' + value.slice(-4);
    },
};
//# sourceMappingURL=mask-rules.js.map