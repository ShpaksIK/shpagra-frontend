import { ArticleType } from './articleType';
import { CommentType } from './commentType';
import { ReactionType } from './reactionType';

export interface ProfileType {
  login: string;
  username: string;
  avatar: string | null;
  articles: ArticleType[];
  comments: CommentType[];
  reactions: ReactionType[];
}

export interface MyProfileType extends ProfileType, MyProfileSettingsType {}

export interface MyProfileSettingsType {
  is_visible_articles: boolean;
  is_visible_comments: boolean;
  is_visible_reactions: boolean;
}

export interface UpdateMyProfileType extends Partial<MyProfileSettingsType> {
  login?: string;
  username?: string;
  avatar?: string | null;
}
