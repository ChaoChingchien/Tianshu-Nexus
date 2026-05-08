"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiskLevelColor = exports.RiskLevelLabel = exports.RiskLevel = void 0;
var RiskLevel;
(function (RiskLevel) {
    RiskLevel["LOW"] = "LOW";
    RiskLevel["MEDIUM"] = "MEDIUM";
    RiskLevel["HIGH"] = "HIGH";
    RiskLevel["CRITICAL"] = "CRITICAL";
})(RiskLevel || (exports.RiskLevel = RiskLevel = {}));
exports.RiskLevelLabel = {
    [RiskLevel.LOW]: '低',
    [RiskLevel.MEDIUM]: '中',
    [RiskLevel.HIGH]: '高',
    [RiskLevel.CRITICAL]: '极高',
};
exports.RiskLevelColor = {
    [RiskLevel.LOW]: 'green',
    [RiskLevel.MEDIUM]: 'orange',
    [RiskLevel.HIGH]: 'red',
    [RiskLevel.CRITICAL]: '#8B0000',
};
//# sourceMappingURL=risk-level.enum.js.map