/**
 * PII 脱敏规则
 */
export const MASK_RULES = {
  /** 姓名：只显示第一个字 + "*" */
  name: (value: string): string => {
    if (!value) return '';
    if (value.length <= 1) return value;
    return value[0] + '*'.repeat(value.length - 1);
  },

  /** 手机号：138****1234 */
  phone: (value: string): string => {
    if (!value || value.length < 7) return value || '';
    return value.slice(0, 3) + '****' + value.slice(-4);
  },

  /** 身份证号：110***********1234 */
  idNumber: (value: string): string => {
    if (!value || value.length < 8) return value || '';
    return value.slice(0, 3) + '***********' + value.slice(-4);
  },
} as const;
