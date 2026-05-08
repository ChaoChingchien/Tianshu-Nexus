export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export const RiskLevelLabel: Record<RiskLevel, string> = {
  [RiskLevel.LOW]: '低',
  [RiskLevel.MEDIUM]: '中',
  [RiskLevel.HIGH]: '高',
  [RiskLevel.CRITICAL]: '极高',
};

export const RiskLevelColor: Record<RiskLevel, string> = {
  [RiskLevel.LOW]: 'green',
  [RiskLevel.MEDIUM]: 'orange',
  [RiskLevel.HIGH]: 'red',
  [RiskLevel.CRITICAL]: '#8B0000',
};
