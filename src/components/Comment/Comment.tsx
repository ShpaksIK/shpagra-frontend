import { useState } from 'react';

import style from './Comment.module.scss';
import { CommentType } from '../../types/entities/commentType';
import { ReactionsTypes } from '../../types/entities/reactionType';
import { formatTimestamp } from '../../utils/dateFormatter';
import AvatarLink from '../../ui/AvatarLink/AvatarLink';
import IconButton from '../../ui/IconButton/IconButton';
import DislikeSVG from '../../ui/svg/DislikeSVG';
import LikeSVG from '../../ui/svg/LikeSVG';
import ReplySVG from '../../ui/svg/ReplySVG';
import ReplyMessage from '../../ui/ReplyMessage/ReplyMessage';

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
    <article className={style.comment} id={`comment-${comment.relatedType}-${comment.id}`}>
      <div className={style.comment__content}>
        <div className={style.comment__content__header}>
          <AvatarLink
            profileAvatar={comment.authorAvatar}
            profileId={comment.authorLogin}
            username={comment.authorUsername}
          />
          <div className={style.comment__content__header__created}>
            <p>
              {createdAt} {comment.updatedAt ? '(изменено)' : ''}
            </p>
          </div>
          <IconButton onClick={() => setReplyCommentId(comment.id)} icon={<ReplySVG />} />
        </div>
        <div className={style.comment__content__reply}>
          {comment.parent && (
            <ReplyMessage
              id={comment.parent.id}
              authorUsername={comment.parent.authorUsername}
              relatedType={comment.parent.relatedType}
              text={comment.parent.text}
            />
          )}
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
