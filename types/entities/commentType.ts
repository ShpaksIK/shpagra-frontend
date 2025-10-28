import { ReactionType } from './reactionType';

type RelatedType = 'article' | 'post';

export interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string | null;
  authorLogin: string;
  authorUsername: string;
  authorAvatar: any | null;
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
