import { ArticleType } from "./articleType";
import { CommentType } from "./commentType";
import { ReactionType } from "./reactionType";

export interface ProfileType {
  login: string;
  username: string;
  avatar: string | null;
  articles: ArticleType[],
  comments: CommentType[],
  reactions: ReactionType[],
}
