export enum ArticleStatus {
  DRAFT = 'DRAFT',
  PENDING_REVIEW = 'PENDING_REVIEW',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
}

export const ArticleStatusLabel: Record<ArticleStatus, string> = {
  [ArticleStatus.DRAFT]: '草稿',
  [ArticleStatus.PENDING_REVIEW]: '待审核',
  [ArticleStatus.PUBLISHED]: '已发布',
  [ArticleStatus.REJECTED]: '已拒绝',
};
