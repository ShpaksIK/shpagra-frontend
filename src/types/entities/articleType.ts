import { CommentType } from './commentType';
import { ReactionType } from './reactionType';

type ArticleStatusType = 'published' | 'review' | 'draft';

type ArticleContentTypesType = 'text' | 'title' | 'img' | 'quote' | 'ol' | 'ul';

export interface ArticleContentType {
  type: ArticleContentTypesType;
  file?: string;
  text?: string;
  src?: string;
  list?: string[];
}

export interface ArticleType {
  id: number;
  title: string;
  description: string;
  banner: string | null;
  content: ArticleContentType[];
  status: ArticleStatusType;
  createdAt: number;
  updatedAt: number | null;
  authorLogin: string;
  authorUsername: string;
  authorAvatar: string | null;
  reactions: ReactionType[];
  comments: CommentType[];
}

export type ArticleFilterType = 'new' | 'old' | 'popular';
