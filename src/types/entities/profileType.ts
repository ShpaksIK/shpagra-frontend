import { ArticleType } from './articleType';
import { CommentType } from './commentType';
import { ReactionType } from './reactionType';

export interface ProfileType {
  login: string;
  username: string;
  avatar: string | null;
  reactions: ReactionType[];
}

export interface MyProfileSettingsType {
  is_visible_articles: boolean;
  is_visible_comments: boolean;
  is_visible_reactions: boolean;
}

export interface MyProfileType extends ProfileType, MyProfileSettingsType {}

export interface UpdateMyProfileType extends Partial<MyProfileSettingsType> {
  login?: string;
  username?: string;
  avatar?: string | null;
}

export interface MyProfileResponseType extends MyProfileType {
  articles: ArticleType[];
  comments: CommentType[];
}
