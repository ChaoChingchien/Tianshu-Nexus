export enum Role {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
  PATIENT = 'PATIENT',
}

export const RoleLabel: Record<Role, string> = {
  [Role.ADMIN]: '管理员',
  [Role.DOCTOR]: '医生',
  [Role.NURSE]: '护士',
  [Role.PATIENT]: '患者',
};
