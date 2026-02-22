import { useEffect, useMemo, useState } from 'react';

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
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import AvatarLink from '../../ui/AvatarLink/AvatarLink';
import A from '../../ui/A/A';
import { createCommentReaction, deleteCommentReaction } from '../../redux/slices/profileSlice/api';

interface CommentProfileProps {
  comment: CommentType;
}

const CommentProfile: React.FC<CommentProfileProps> = ({ comment }) => {
  const dispatch = useAppDispatch();

  const createdAt = formatTimestamp(comment.created_at);
  const likeReactionsLength = useMemo(() => {
    return comment.reactions.filter((r) => r.content === 'like').length;
  }, [comment.reactions.length]);
  const dislikeReactionsLength = useMemo(() => {
    return comment.reactions.filter((r) => r.content === 'dislike').length;
  }, [comment.reactions.length]);

  const profile = useAppSelector((state) => state.auth.profile);
  const reactionLoading = useAppSelector((state) => state.article.loadings.commentReaction);

  const [sentReaction, setReaction] = useState<ReactionsTypes | null>(null);

  useEffect(() => {
    if (profile) {
      setReaction(comment.reactions.find((r) => r.author_login === profile.login)?.content || null);
    }
  }, [comment.reactions.length]);

  const removeReaction = () => {
    const reactionId = comment.reactions.find((r) => r.author_login === profile?.login)?.id;
    if (!reactionId) return;

    dispatch(
      deleteCommentReaction({
        reactionId,
        commentId: comment.id,
      }),
    );
  };

  const switchReaction = (reaction: ReactionsTypes) => {
    if (!profile) return;
    if (reactionLoading[comment.id]?.isLoading) return;

    if (reaction === sentReaction) {
      removeReaction();
    } else if (comment.reactions.find((r) => r.author_login === profile.login)) {
      removeReaction();
      dispatch(
        createCommentReaction({
          commentId: comment.id,
          content: reaction,
        }),
      );
    } else {
      dispatch(
        createCommentReaction({
          commentId: comment.id,
          content: reaction,
        }),
      );
    }
  };

  return (
    <article className={style.comment}>
      <Block>
        <header className={style.comment__header}>
          <div className={style.comment__header__text}>
            <b>{comment.related_type === 'article' ? 'К статье' : 'К посту'}</b>
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
          <div className={style.comment__content__header}>
            <AvatarLink
              profileAvatar={comment.author_avatar}
              profileId={comment.author_login}
              username={comment.author_username}
            />
            <div className={style.comment__content__header__created}>
              <p>
                {createdAt}
                {comment.updated_at ? '(изменено)' : ''}
              </p>
              {comment.id_parent && (
                <>
                  <span>ответ </span>
                  <A to={`/profile/${comment.login_parent}`}>{comment.username_parent}</A>
                </>
              )}
            </div>
          </div>
          <p>{comment.content}</p>
        </div>
        <footer className={style.comment__footer}>
          <div className={style.comment__footer__date}>
            <p>{createdAt}</p>
          </div>
          <div className={style.comment__footer__controls}>
            <IconButton
              onClick={() => switchReaction('like')}
              icon={<LikeSVG filled={sentReaction === 'like'} color="var(--color-element)" />}
              text={`${likeReactionsLength}`}
            />
            <IconButton
              onClick={() => switchReaction('dislike')}
              icon={<DislikeSVG filled={sentReaction === 'dislike'} />}
              text={`${dislikeReactionsLength}`}
            />
          </div>
        </footer>
      </Block>
    </article>
  );
};

export default CommentProfile;
