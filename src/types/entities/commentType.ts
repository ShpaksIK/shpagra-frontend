import { ReactionType } from './reactionType';

export type CommentsFilter = 'negative' | 'positive' | 'new' | 'old';

export type RelatedType = 'article' | 'post';

export interface CommentType {
  id: number;
  content: string;
  created_at: number;
  updated_at: number | null;
  author_login: string;
  author_username: string;
  author_avatar: string | null;
  parent: ParentCommentType | null;
  id_parent: number;
  login_parent: string;
  username_parent: string;
  related_type: RelatedType;
  reactions: ReactionType[];
}

export interface CommentSendType {
  content: string;
  id_parent: number | null;
}

export interface ParentCommentType {
  id: number;
  authorUsername: string;
  relatedType: RelatedType;
  text: string;
}
