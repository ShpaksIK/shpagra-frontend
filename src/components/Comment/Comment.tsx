import { useState } from 'react';

import style from './Comment.module.scss';
import { CommentType } from '../../../types/entities/commentType';
import { ReactionsTypes } from '../../../types/entities/reactionType';
import { formatTimestamp } from '../../../utils/dateFormatter';
import Avatar from '../../ui/Avatar/Avatar';
import IconButton from '../../ui/IconButton/IconButton';
import DislikeSVG from '../../ui/svg/DislikeSVG';
import LikeSVG from '../../ui/svg/LikeSVG';
import ReplySVG from '../../ui/svg/ReplySVG';

interface CommentProps {
  comment: CommentType;
  setReplyCommentId: (commentId: number) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, setReplyCommentId }) => {
  const createdAt = formatTimestamp(comment.createdAt);

  const [isSentLike, setLike] = useState<boolean>(false);
  const [isSentDislike, setDislike] = useState<boolean>(false);
  const switchReaction = (reaction: ReactionsTypes) => {
    if (reaction === 'like') {
      setLike((prev) => !prev);
      if (isSentDislike) {
        setDislike(false);
      }
    } else if (reaction === 'dislike') {
      setDislike((prev) => !prev);
      if (isSentLike) {
        setLike(false);
      }
    }
  };

  return (
    <article className={style.comment}>
      <div className={style.comment__content}>
        <div className={style.comment__content__header}>
          <Avatar
            profileAvatar={comment.authorAvatar}
            profileId={comment.authorLogin}
            username={comment.authorUsername}
          />
          <p className={style.comment__content__header__created}>
            {createdAt} {comment.updatedAt ? '(изменено)' : ''}
          </p>
          <IconButton onClick={() => setReplyCommentId(comment.id)} icon={<ReplySVG />} />
        </div>
        <div className={style.comment__content__text}>
          <p>{comment.content}</p>
        </div>
      </div>
      <div className={style.comment__controls}>
        <IconButton
          onClick={() => switchReaction('like')}
          icon={<LikeSVG filled={isSentLike} color="var(--color-element)" />}
          text="14"
        />
        <IconButton
          onClick={() => switchReaction('dislike')}
          icon={<DislikeSVG filled={isSentDislike} />}
          text="1"
        />
      </div>
    </article>
  );
};

export default Comment;
