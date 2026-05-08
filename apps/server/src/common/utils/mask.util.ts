import { MASK_RULES } from '@tianshu/shared';

export function maskField(field: string, value: string | undefined | null): string | null {
  if (!value) return null;
  const rule = MASK_RULES[field as keyof typeof MASK_RULES];
  if (rule) return rule(value);
  return value;
}

export function maskPatientData(data: Record<string, unknown>): Record<string, unknown> {
  const sensitiveFields = ['name', 'phone', 'idNumber'];
  const result = { ...data };
  for (const field of sensitiveFields) {
    if (result[field] && typeof result[field] === 'string') {
      result[field] = maskField(field, result[field] as string);
    }
  }
  return result;
}
