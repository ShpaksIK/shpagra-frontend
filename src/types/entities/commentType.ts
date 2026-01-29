import { ReactionType } from './reactionType';

export type RelatedType = 'article' | 'post';

export interface CommentType {
  id: number;
  content: string;
  createdAt: number;
  updatedAt: number | null;
  authorLogin: string;
  authorUsername: string;
  authorAvatar: string | null;
  parent: ParentCommentType | null;
  relatedId: number;
  relatedType: RelatedType;
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
