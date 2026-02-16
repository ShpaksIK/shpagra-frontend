import { ReactionType } from './reactionType';

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
  related_type: RelatedType;
  reactions: ReactionType[];
}

export interface CommentSendType {
  authorLogin: string;
  content: string;
  relatedId: number;
  parentId: number | null;
  relatedType: RelatedType;
}

export interface ParentCommentType {
  id: number;
  authorUsername: string;
  relatedType: RelatedType;
  text: string;
}
