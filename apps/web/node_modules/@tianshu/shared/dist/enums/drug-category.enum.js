"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrugCategoryLabel = exports.DrugCategory = void 0;
var DrugCategory;
(function (DrugCategory) {
    DrugCategory["PSYCHOTROPIC"] = "PSYCHOTROPIC";
    DrugCategory["WESTERN"] = "WESTERN";
    DrugCategory["CHINESE_PATENT"] = "CHINESE_PATENT";
})(DrugCategory || (exports.DrugCategory = DrugCategory = {}));
exports.DrugCategoryLabel = {
    [DrugCategory.PSYCHOTROPIC]: '精神类',
    [DrugCategory.WESTERN]: '西药',
    [DrugCategory.CHINESE_PATENT]: '中成药',
};
//# sourceMappingURL=drug-category.enum.js.map