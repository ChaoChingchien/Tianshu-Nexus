"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleStatusLabel = exports.ArticleStatus = void 0;
var ArticleStatus;
(function (ArticleStatus) {
    ArticleStatus["DRAFT"] = "DRAFT";
    ArticleStatus["PENDING_REVIEW"] = "PENDING_REVIEW";
    ArticleStatus["PUBLISHED"] = "PUBLISHED";
    ArticleStatus["REJECTED"] = "REJECTED";
})(ArticleStatus || (exports.ArticleStatus = ArticleStatus = {}));
exports.ArticleStatusLabel = {
    [ArticleStatus.DRAFT]: '草稿',
    [ArticleStatus.PENDING_REVIEW]: '待审核',
    [ArticleStatus.PUBLISHED]: '已发布',
    [ArticleStatus.REJECTED]: '已拒绝',
};
//# sourceMappingURL=article-status.enum.js.map