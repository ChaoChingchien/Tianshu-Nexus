/**
 * PII 脱敏规则
 */
export declare const MASK_RULES: {
    /** 姓名：只显示第一个字 + "*" */
    readonly name: (value: string) => string;
    /** 手机号：138****1234 */
    readonly phone: (value: string) => string;
    /** 身份证号：110***********1234 */
    readonly idNumber: (value: string) => string;
};
//# sourceMappingURL=mask-rules.d.ts.map