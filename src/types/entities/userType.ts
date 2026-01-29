import { ArticleType } from './articleType';
import { CommentType } from './commentType';
import { ReactionType } from './reactionType';

export interface UserType {
  isAuth: boolean;
  login: string | null;
  username: string | null;
  avatar: string | null;
  articles: ArticleType[];
  comments: CommentType[];
  reactions: ReactionType[];
}
