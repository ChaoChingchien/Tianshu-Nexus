import { randomBytes } from 'crypto';

export function generateAnonymousId(): string {
  const prefix = 'P';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = randomBytes(3).toString('hex').toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

export function generateInvitationCode(): string {
  return randomBytes(4).toString('hex').toUpperCase();
}
