import { ArticleStatus } from '../enums';

export interface IEducationArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags?: string;
  applicableDiseases?: string;
  status: ArticleStatus;
  isPushable: boolean;
  targetPatientGroups?: string;
  createdById: string;
  reviewComment?: string;
  viewCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPatientGroup {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
