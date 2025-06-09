type ArticleStatusType = 'published' | 'review' | 'draft';

interface ArticleContentType {
  type: string;
  file?: any;
  text?: string;
}

export interface ArticleType {
  id: number;
  title: string;
  description: string;
  banner: any;
  content: ArticleContentType[];
  status: ArticleStatusType;
  createdAt: string;
  updatedAt?: string;
  authorLogin: string;
  authorUsername: string;
  authorAvatar: any;
  isLike: boolean;
}
