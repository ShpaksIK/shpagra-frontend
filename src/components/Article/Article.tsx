import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import TextareaAutosize from 'react-textarea-autosize';

import { ArticleType } from '../../types/entities/articleType';
import style from './Article.module.scss';
import bannerIMG from './../../../public/img/test.png';
import AvatarLink from '../../ui/AvatarLink/AvatarLink';
import { formatTimestamp } from '../../utils/dateFormatter';
import IconButton from '../../ui/IconButton/IconButton';
import { copyToClipboard } from '../../utils/copyToClipboard';
import ShareSVG from '../../ui/svg/ShareSVG';
import HeartSVG from '../../ui/svg/HeartSVG';
import CommentSVG from '../../ui/svg/CommentSVG';
import Comment from '../Comment/Comment';
import Button from '../../ui/Button/Button';
import SendSVG from '../../ui/svg/SendSVG';
import Chip from '../../ui/Chip/Chip';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import {
  createArticleComment,
  createReaction,
  getArticleComments,
} from '../../redux/slices/articleSlice/api';
import { resetCommentLoading } from '../../redux/slices/articleSlice/articleSlice';
import Select from '../../ui/Select/Select';

interface ArticleProps {
  article: ArticleType;
}

const Article: React.FC<ArticleProps> = React.memo(({ article }) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.auth.profile);
  const createdAt = formatTimestamp(article.created_at);
  const [isOpenComments, setOpenComments] = useState<boolean>(false);

  const toggleOpenComments = () => {
    if (!isOpenComments) {
      setOpenComments(true);
      dispatch(getArticleComments(article.id));
    } else {
      setOpenComments(false);
    }
  };

  const [isSentReaction, setReaction] = useState<boolean>(
    article.reactions.findIndex((r) => r.author_login === profile?.login) !== -1,
  );
  useEffect(() => {
    if (profile) {
      setReaction(article.reactions.findIndex((r) => r.author_login === profile?.login) !== -1);
    }
  }, [profile]);
  const toggleReaction = () => {
    if (!profile) {
      return;
    }
    setReaction((prev) => !prev);
    dispatch(
      createReaction({
        articleId: article.id,
        content: 'like',
        profileLogin: profile.login,
      }),
    );
  };

  const copyArticleLink = () => {
    copyToClipboard(`http://localhost:5173/article/${article.id}`);
  };

  const [isCorrectComment, setCorrectComment] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>('');
  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);
  const [isTextareaReadOnly, setTextareaReadOnly] = useState<boolean>(false);
  const commentLoading = useAppSelector((state) => state.article.loadings.comment);

  useEffect(() => {
    setTextareaReadOnly(commentLoading.isLoading);
    setCorrectComment(!commentLoading.isLoading);
  }, [commentLoading.isLoading]);

  useEffect(() => {
    if (commentLoading.isSuccess) {
      setCommentValue('');
      setReplyCommentId(null);
    }
  }, [commentLoading.isSuccess]);

  const handleCommentValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = event.target.value;
    setCommentValue(newComment);

    if (newComment.trim().length === 0 || newComment.trim().length > 2048) {
      setCorrectComment(false);
    } else {
      setCorrectComment(true);
    }
  };

  const handleSubmitComment = () => {
    if (isCorrectComment) {
      dispatch(resetCommentLoading());
      dispatch(
        createArticleComment({
          articleId: article.id,
          comment: {
            content: commentValue,
            id_parent: replyCommentId,
          },
        }),
      );
    }
  };

  const filterValues = [
    {
      value: 'positive',
      text: 'Положительные',
    },
    {
      value: 'negative',
      text: 'Негативные',
    },
    {
      value: 'new',
      text: 'Новые',
    },
    {
      value: 'old',
      text: 'Старые',
    },
  ];

  const handleChangeCommentsFilter = (value: string) => {
    console.log(value);
  };

  return (
    <article className={style.article}>
      <Link to={`/article/${article.id}`}>
        <div className={style.article__banner}>
          <img className={style.article__image} src={bannerIMG} alt={article.title} />
          <div className={style.article__image__background}></div>
          <p className={style.article__title}>{article.title}</p>
        </div>
      </Link>
      <div className={style.article__content}>
        <p className={style.article__content__description}>{article.description}</p>
        <div className={style.article__footer}>
          <div className={style.article__footer__author}>
            <AvatarLink
              profileAvatar={article.author_avatar}
              profileId={article.author_login}
              username={article.author_username}
            />
            <p className={style.article__footer__created}>| {createdAt}</p>
          </div>

          <div className={style.article__footer__controls}>
            <IconButton
              onClick={toggleReaction}
              icon={<HeartSVG color="#ff0000" filled={isSentReaction} />}
              text={`${article.reactions.length}`}
            />
            <IconButton
              onClick={toggleOpenComments}
              icon={isOpenComments ? <CommentSVG color="#000000" /> : <CommentSVG />}
              text={`${article.comments_length}`}
            />
            <IconButton onClick={copyArticleLink} icon={<ShareSVG />} />
          </div>
        </div>
      </div>
      {isOpenComments && (
        <>
          <div className={style.article__comments__filter}>
            <Select
              values={filterValues}
              onChange={handleChangeCommentsFilter}
              title="Фильтр комментариев"
            />
          </div>
          {article.comments.length === 0 && (
            <div className={style.article__comments_no}>
              <p>Прокомментируйте статью первым!</p>
            </div>
          )}
          <section className={style.article__comments}>
            {article.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} setReplyCommentId={setReplyCommentId} />
            ))}
          </section>
          {replyCommentId && (
            <div className={style.article__reply}>
              <Chip
                text={`Ответ ${article.comments.find((comment) => comment.id === replyCommentId)?.author_username}`}
                onClose={() => setReplyCommentId(null)}
              />
            </div>
          )}
          {profile && (
            <div className={style.article__send}>
              <TextareaAutosize
                className={style.article__send__textarea}
                minRows={1}
                maxRows={5}
                value={commentValue}
                onChange={handleCommentValue}
                readOnly={isTextareaReadOnly}
                placeholder="Прокомментируйте..."
              />
              <div className={style.article__send__controls}>
                <Button
                  isCircle={true}
                  title="Отправить"
                  disabled={!isCorrectComment}
                  onClick={handleSubmitComment}
                >
                  <SendSVG />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </article>
  );
});

export default Article;
