import { AppointmentStatus } from '../enums';
export interface IDoctorSchedule {
    id: string;
    doctorId: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface IAppointment {
    id: string;
    patientId: string;
    doctorId: string;
    treatmentItemId?: string;
    appointmentDate: string;
    startTime: string;
    endTime: string;
    status: AppointmentStatus;
    cancellationReason?: string;
    isCharged: boolean;
    createdAt: string;
    updatedAt: string;
}
//# sourceMappingURL=appointment.types.d.ts.map