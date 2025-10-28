import { CommentType } from './commentType';
import { ReactionType } from './reactionType';

type ArticleStatusType = 'published' | 'review' | 'draft';

interface ArticleContentType {
  type: string;
  file?: any;
  text?: string;
  src?: string;
}

export interface ArticleType {
  id: number;
  title: string;
  description: string;
  banner: any;
  content: ArticleContentType[];
  status: ArticleStatusType;
  createdAt: string;
  updatedAt: string | null;
  authorLogin: string;
  authorUsername: string;
  authorAvatar: any | null;
  reactions: ReactionType[];
  comments: CommentType[];
}

export type ArticleFilterType = 'new' | 'old' | 'popular';