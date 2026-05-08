import { FollowUpType, FollowUpStatus } from '../enums';
export interface IFollowUp {
    id: string;
    patientId: string;
    medicalRecordId?: string;
    doctorId: string;
    plannedDate: string;
    followUpType: FollowUpType;
    status: FollowUpStatus;
    currentSymptoms?: string;
    medicationCompliance?: string;
    adverseReactions?: string;
    bloodPressure?: string;
    heartRate?: number;
    doctorAssessment?: string;
    treatmentAdjustment?: string;
    nextFollowUpDate?: string;
    patientScore?: number;
    patientFeedback?: string;
    createdAt: string;
    updatedAt: string;
}
//# sourceMappingURL=followup.types.d.ts.map