import { PrismaClient, Role, PatientCategory } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: adminPassword,
      displayName: '系统管理员',
      role: Role.ADMIN,
      isActive: true,
      permissions: 'patient:view,patient:create,patient:edit,patient:delete,medication:manage,treatment:manage,schedule:manage,followup:manage,education:manage,ai:access,audit:view,system:settings',
    },
  });
  console.log('Created admin user:', admin.username);

  // Create doctor user
  const doctorPassword = await bcrypt.hash('doctor123', 10);
  const doctor = await prisma.user.upsert({
    where: { username: 'doctor1' },
    update: {},
    create: {
      username: 'doctor1',
      passwordHash: doctorPassword,
      displayName: '张医生',
      role: Role.DOCTOR,
      department: '中医科',
      hospital: '天枢医院',
      isActive: true,
    },
  });
  console.log('Created doctor user:', doctor.username);

  // Create doctor profile
  await prisma.doctorProfile.upsert({
    where: { userId: doctor.id },
    update: {},
    create: {
      userId: doctor.id,
      department: '中医科',
      hospital: '天枢医院',
      specialties: '针灸,推拿,中药调理',
    },
  });

  // Create nurse user
  const nursePassword = await bcrypt.hash('nurse123', 10);
  const nurse = await prisma.user.upsert({
    where: { username: 'nurse1' },
    update: {},
    create: {
      username: 'nurse1',
      passwordHash: nursePassword,
      displayName: '李护士',
      role: Role.NURSE,
      department: '中医科',
      hospital: '天枢医院',
      isActive: true,
    },
  });
  console.log('Created nurse user:', nurse.username);

  // Create invitation codes
  for (let i = 1; i <= 5; i++) {
    const code = `INV${String(i).padStart(5, '0')}`;
    await prisma.invitationCode.upsert({
      where: { code },
      update: {},
      create: { code, isUsed: false },
    });
  }
  console.log('Created 5 invitation codes');

  // Create sample patient
  const patient = await prisma.patient.upsert({
    where: { anonymousId: 'P000001' },
    update: {},
    create: {
      anonymousId: 'P000001',
      name: '王小明',
      gender: '男',
      age: 35,
      phone: '13800138000',
      diagnosis: '腰椎间盘突出',
      department: '中医科',
      admissionDate: new Date('2026-04-01'),
      bedNumber: '101-1',
      category: PatientCategory.INPATIENT,
      primaryDoctorId: doctor.id,
    },
  });
  console.log('Created sample patient:', patient.name);

  // Create system settings
  await prisma.systemSettings.create({
    data: {
      systemName: '天枢临床决策管理系统',
      enableSelfRegistration: true,
      enableTwoFactorAuth: false,
      sessionTimeoutMinutes: 480,
      maxLoginAttempts: 5,
      enableAuditLog: true,
      auditLogRetentionDays: 365,
      enablePiiMask: true,
    },
  });
  console.log('Created system settings');

  console.log('\nSeed completed!');
  console.log('---');
  console.log('Admin login: admin / admin123');
  console.log('Doctor login: doctor1 / doctor123');
  console.log('Nurse login: nurse1 / nurse123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
