import { ReactionType } from './reactionType';

type RelatedType = 'article' | 'post';

export interface CommentType {
  id: number;
  content: string;
  createdAt: number;
  updatedAt: number | null;
  authorLogin: string;
  authorUsername: string;
  authorAvatar: string | null;
  parentId: number | null;
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
