import { CommentType } from './commentType';
import { ReactionType } from './reactionType';

export type ArticleStatusType = 'public' | 'moderation' | 'draft' | 'deny' | 'check';

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
  created_at: number;
  updated_at: number | null;
  author_login: string;
  author_username: string;
  author_avatar: string | null;
  reactions: ReactionType[];
  reactions_length: number;
  comments: CommentType[];
  comments_length: number;
}

export type ArticleFilterType = 'new' | 'old' | 'popular';

export interface CreateArticleType {
  title: string;
  description: string;
  banner: string | null;
  content: ArticleContentType[];
  authorId: string;
}
