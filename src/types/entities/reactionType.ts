export type ReactionsTypes = 'like' | 'dislike' | 'heart' | 'poop';

export interface ReactionType {
  id: number;
  content: ReactionsTypes;
  author_login: string;
  type_entity: 'article' | 'comment';
  text: string;
  id_entity: number;
}

export interface CreateReactionType extends ReactionType {
  id_entity: number;
}
