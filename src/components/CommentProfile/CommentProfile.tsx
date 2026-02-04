import { useState } from 'react';

import style from './CommentProfile.module.scss';
import { CommentType } from '../../types/entities/commentType';
import IconButton from '../../ui/IconButton/IconButton';
import ShareSVG from '../../ui/svg/ShareSVG';
import SettingsSVG from '../../ui/svg/SettingsSVG';
import { formatTimestamp } from '../../utils/dateFormatter';
import LikeSVG from '../../ui/svg/LikeSVG';
import DislikeSVG from '../../ui/svg/DislikeSVG';
import { ReactionsTypes } from '../../types/entities/reactionType';
import Block from '../../ui/Block/Block';

interface CommentProfileProps {
  comment: CommentType;
}

const CommentProfile: React.FC<CommentProfileProps> = ({ comment }) => {
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
      <Block>
        <header className={style.comment__header}>
          <div className={style.comment__header__text}>
            <b>{comment.relatedType === 'article' ? 'К статье' : 'К посту'}</b>
            {comment.parent && <p>(ответ {comment.parent.authorUsername})</p>}
          </div>
          <div className={style.comment__header__controls}>
            <IconButton
              icon={<SettingsSVG color="var(--color-element-secondary)" />}
              onClick={() => {}}
            />
            <IconButton icon={<ShareSVG />} onClick={() => {}} />
          </div>
        </header>
        <div className={style.comment__content}>
          <p>{comment.content}</p>
        </div>
        <footer className={style.comment__footer}>
          <div className={style.comment__footer__date}>
            <p>{createdAt}</p>
          </div>
          <div className={style.comment__footer__controls}>
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
        </footer>
      </Block>
    </article>
  );
};

export default CommentProfile;
