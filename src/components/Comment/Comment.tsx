import { useEffect, useMemo, useState } from 'react';

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
import A from '../../ui/A/A';
import {
  createArticleCommentReaction,
  deleteArticleCommentReaction,
  deleteComment,
} from '../../redux/slices/articleSlice/api';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import DotsSVG from '../../ui/svg/DotsSVG';
import Dropdown from '../../ui/Dropdown/Dropdown';
import ButtonAction from '../../ui/ButtonAction/ButtonAction';
import EditSVG from '../../ui/svg/EditSVG';
import TrashSVG from '../../ui/svg/TrashSVG';

interface CommentProps {
  comment: CommentType;
  setReplyCommentId: (commentId: number) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, setReplyCommentId }) => {
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
      deleteArticleCommentReaction({
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
        createArticleCommentReaction({
          commentId: comment.id,
          content: reaction,
        }),
      );
    } else {
      dispatch(
        createArticleCommentReaction({
          commentId: comment.id,
          content: reaction,
        }),
      );
    }
  };

  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const handleDeleteComment = () => {
    dispatch(deleteComment(comment.id));
  };

  return (
    <article className={style.comment} id={`comment-${comment.related_type}-${comment.id}`}>
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
          <IconButton
            className={style.comment__content__header__reply}
            onClick={() => setReplyCommentId(comment.id)}
            icon={<ReplySVG />}
          />
          <div className={style.comment__content__header__reply}>
            {profile?.login === comment.author_login && (
              <>
                <IconButton onClick={() => setSettingsOpen(true)} icon={<DotsSVG />} />
                {isSettingsOpen && (
                  <Dropdown
                    dropdownClose={() => setSettingsOpen(false)}
                    className={style.comment__content__header__dropdown}
                  >
                    <ButtonAction onClick={() => {}} icon={<EditSVG size={20} />}>
                      Изменить
                    </ButtonAction>
                    <ButtonAction
                      onClick={() => handleDeleteComment()}
                      icon={<TrashSVG size={20} />}
                      isDanger
                    >
                      Удалить
                    </ButtonAction>
                  </Dropdown>
                )}
              </>
            )}
          </div>
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
          icon={<LikeSVG filled={sentReaction === 'like'} color="var(--color-element)" />}
          text={`${likeReactionsLength}`}
        />
        <IconButton
          onClick={() => switchReaction('dislike')}
          icon={<DislikeSVG filled={sentReaction === 'dislike'} />}
          text={`${dislikeReactionsLength}`}
        />
      </div>
    </article>
  );
};

export default Comment;
