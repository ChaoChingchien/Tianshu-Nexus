import { LeaveType, LeaveStatus } from '../enums';
export interface ILeaveRequest {
    id: string;
    patientId: string;
    startTime: string;
    endTime: string;
    leaveType: LeaveType;
    reason?: string;
    destination?: string;
    emergencyContact?: string;
    status: LeaveStatus;
    approvedById?: string;
    approvalComment?: string;
    returnConfirmed: boolean;
    signature: string;
    createdAt: string;
    updatedAt: string;
}
//# sourceMappingURL=leave.types.d.ts.map