/**
 * 12 项细粒度功能权限定义
 */
export declare const PERMISSIONS: {
    readonly PATIENT_VIEW: "patient:view";
    readonly PATIENT_CREATE: "patient:create";
    readonly PATIENT_EDIT: "patient:edit";
    readonly PATIENT_DELETE: "patient:delete";
    readonly MEDICATION_MANAGE: "medication:manage";
    readonly TREATMENT_MANAGE: "treatment:manage";
    readonly SCHEDULE_MANAGE: "schedule:manage";
    readonly FOLLOWUP_MANAGE: "followup:manage";
    readonly EDUCATION_MANAGE: "education:manage";
    readonly AI_ACCESS: "ai:access";
    readonly AUDIT_VIEW: "audit:view";
    readonly SYSTEM_SETTINGS: "system:settings";
};
export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
export declare const PERMISSION_LABELS: Record<Permission, string>;
//# sourceMappingURL=permissions.d.ts.map