export type ReactionsTypes = 'like' | 'dislike' | 'heart' | 'poop';

export interface ReactionType {
  id: number;
  content: ReactionsTypes;
  author_login: string;
  // type: ReactionsTypes;
  // author_username: string;
  // created_at: string;
}

export interface CreateReactionType extends ReactionType {
  id_entity: number;
}
