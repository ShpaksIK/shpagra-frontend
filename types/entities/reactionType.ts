export type ReactionsTypes = 'like' | 'dislike' | 'heart' | 'poop';

export interface ReactionType {
  id: number;
  type: ReactionsTypes;
  authorId: string;
}
