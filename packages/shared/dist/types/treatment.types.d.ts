import { TreatmentCategory, TCMTreatmentCategory, TreatmentPlanStatus } from '../enums';
export interface ITreatmentItem {
    id: string;
    name: string;
    code?: string;
    category: TreatmentCategory;
    standardDuration?: number;
    standardFrequency?: string;
    price?: number;
    description?: string;
    requiredEquipment?: string;
    isActive: boolean;
    customTags?: string;
    createdAt: string;
    updatedAt: string;
}
export interface IAcupoint {
    id: string;
    name: string;
    pinyin?: string;
    englishName?: string;
    code?: string;
    meridian?: string;
    category?: string;
    location?: string;
    simpleLocation?: string;
    anatomy?: string;
    indications?: string;
    modernApplications?: string;
    tcmIndications?: string;
    needlingMethod?: string;
    moxibustionMethod?: string;
    massageMethod?: string;
    compatibleAcupoints?: string;
    classicPrescriptions?: string;
    precautions?: string;
    contraindications?: string;
    warnings?: string;
    diagramUrl?: string;
    teachingVideoUrl?: string;
    references?: string;
    clinicalCases?: string;
    researchPapers?: string;
    modernResearch?: string;
    effects?: string;
    fiveElement?: string;
    yinYang?: string;
    relatedMeridians?: string;
    relatedOrgans?: string;
    relatedSyndromes?: string;
    viewCount: number;
    rating?: number;
    createdAt: string;
    updatedAt: string;
}
export interface IAcupunctureTechnique {
    id: string;
    name: string;
    description?: string;
    effects?: string;
    operationMethod?: string;
    retentionTime?: string;
    createdAt: string;
    updatedAt: string;
}
export interface ITCMTreatment {
    id: string;
    name: string;
    category: TCMTreatmentCategory;
    description?: string;
    indications?: string;
    contraindications?: string;
    suggestedDuration?: number;
    referencePrice?: number;
    customTags?: string;
    createdAt: string;
    updatedAt: string;
}
export interface ITreatmentPlan {
    id: string;
    patientId: string;
    medicalRecordId?: string;
    name: string;
    syndromeDiagnosis?: string;
    treatmentPrinciple?: string;
    acupointPrescription?: string;
    tcmTreatments?: string;
    medicationPrescription?: string;
    otherTreatments?: string;
    courseCount?: number;
    treatmentFrequency?: string;
    startDate?: string;
    endDate?: string;
    status: TreatmentPlanStatus;
    efficacyScore?: number;
    createdAt: string;
    updatedAt: string;
}
//# sourceMappingURL=treatment.types.d.ts.map