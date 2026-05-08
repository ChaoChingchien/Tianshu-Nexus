"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSION_LABELS = exports.PERMISSIONS = void 0;
/**
 * 12 项细粒度功能权限定义
 */
exports.PERMISSIONS = {
    PATIENT_VIEW: 'patient:view',
    PATIENT_CREATE: 'patient:create',
    PATIENT_EDIT: 'patient:edit',
    PATIENT_DELETE: 'patient:delete',
    MEDICATION_MANAGE: 'medication:manage',
    TREATMENT_MANAGE: 'treatment:manage',
    SCHEDULE_MANAGE: 'schedule:manage',
    FOLLOWUP_MANAGE: 'followup:manage',
    EDUCATION_MANAGE: 'education:manage',
    AI_ACCESS: 'ai:access',
    AUDIT_VIEW: 'audit:view',
    SYSTEM_SETTINGS: 'system:settings',
};
exports.PERMISSION_LABELS = {
    [exports.PERMISSIONS.PATIENT_VIEW]: '患者查看',
    [exports.PERMISSIONS.PATIENT_CREATE]: '患者创建',
    [exports.PERMISSIONS.PATIENT_EDIT]: '患者编辑',
    [exports.PERMISSIONS.PATIENT_DELETE]: '患者删除',
    [exports.PERMISSIONS.MEDICATION_MANAGE]: '药品管理',
    [exports.PERMISSIONS.TREATMENT_MANAGE]: '治疗管理',
    [exports.PERMISSIONS.SCHEDULE_MANAGE]: '排班管理',
    [exports.PERMISSIONS.FOLLOWUP_MANAGE]: '随访管理',
    [exports.PERMISSIONS.EDUCATION_MANAGE]: '宣教管理',
    [exports.PERMISSIONS.AI_ACCESS]: 'AI决策',
    [exports.PERMISSIONS.AUDIT_VIEW]: '审计日志',
    [exports.PERMISSIONS.SYSTEM_SETTINGS]: '系统设置',
};
//# sourceMappingURL=permissions.js.map