import { RelatedType } from './commentType';

export type ReactionsTypes = 'like' | 'dislike' | 'heart' | 'poop';

export interface ReactionType {
  id: number;
  type: ReactionsTypes;
  authorLogin: string;
  relatedId: number;
  relatedType: RelatedType;
}
