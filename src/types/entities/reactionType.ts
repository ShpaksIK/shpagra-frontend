export type ReactionsTypes = 'like' | 'dislike' | 'heart' | 'poop';

export interface ReactionType {
  id: number;
  content: string;
  author_login: string;
  // type: ReactionsTypes;
  // author_username: string;
  // created_at: string;
}
