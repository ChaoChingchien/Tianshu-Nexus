import { DrugCategory } from '../enums';

export interface IDrug {
  id: string;
  name: string;
  genericName?: string;
  category: DrugCategory;
  specification?: string;
  unit?: string;
  defaultDosage?: string;
  usage?: string;
  price?: number;
  manufacturer?: string;
  description?: string;
  totalStock: number;
  minStockWarning: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IDispensingRecord {
  id: string;
  patientId: string;
  drugId: string;
  drugName: string;
  specification?: string;
  dailyDosage?: string;
  quantity: number;
  remainingQuantity: number;
  dispensingDate: string;
  expectedNextDate?: string;
  dispensedBy: string;
  signature: string;
  createdAt: string;
}
