import { createHmac } from 'crypto';

export function generateSignature(data: Record<string, unknown>): string {
  const secret = process.env.HMAC_SECRET || 'default-secret';
  const sorted = Object.keys(data)
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join('&');
  return createHmac('sha256', secret).update(sorted).digest('hex');
}

export function verifySignature(data: Record<string, unknown>, signature: string): boolean {
  const expected = generateSignature(data);
  return expected === signature;
}
