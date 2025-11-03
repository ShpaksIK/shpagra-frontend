import { useState } from 'react';
import { Link } from 'react-router';
import TextareaAutosize from 'react-textarea-autosize';

import { ArticleType } from '../../../types/entities/articleType';
import style from './Article.module.scss';
import bannerIMG from './../../../public/img/test.png';
import Avatar from '../../ui/Avatar/Avatar';
import { formatTimestamp } from './../../../utils/dateFormatter';
import IconButton from '../../ui/IconButton/IconButton';
import { copyToClipboard } from './../../../utils/copyToClipboard';
import ShareSVG from '../../ui/svg/ShareSVG';
import HeartSVG from '../../ui/svg/HeartSVG';
import CommentSVG from '../../ui/svg/CommentSVG';
import Comment from '../Comment/Comment';
import Button from '../../ui/Button/Button';
import SendSVG from '../../ui/svg/SendSVG';
import Chip from '../../ui/Chip/Chip';

interface ArticleProps {
  article: ArticleType;
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  const createdAt = formatTimestamp(article.createdAt);

  const [isOpenComments, setOpenComments] = useState<boolean>(false);
  const toggleOpenComments = () => {
    setOpenComments((prev) => !prev);
  };

  const [isSentReaction, setReaction] = useState<boolean>(false);
  const toggleReaction = () => {
    setReaction((prev) => !prev);
  };

  const copyArticleLink = () => {
    copyToClipboard(`http://localhost:5173/article/${article.id}`);
  };

  const [isCorrectComment, setCorrectComment] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>('');
  const handleCommentValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = event.target.value;
    setCommentValue(newComment);

    if (newComment.trim().length === 0 || newComment.trim().length > 1000) {
      setCorrectComment(false);
    } else {
      setCorrectComment(true);
    }
  };

  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);

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
            <Avatar
              profileAvatar={article.authorAvatar}
              profileId={article.authorLogin}
              username={article.authorUsername}
            />
            <p className={style.article__footer__created}>| {createdAt}</p>
          </div>

          <div className={style.article__footer__controls}>
            <IconButton
              onClick={toggleReaction}
              icon={<HeartSVG color="#ff0000" filled={isSentReaction} />}
              text="1488"
            />
            <IconButton
              onClick={toggleOpenComments}
              icon={isOpenComments ? <CommentSVG color="#000000" /> : <CommentSVG />}
              text="12"
            />
            <IconButton onClick={copyArticleLink} icon={<ShareSVG />} />
          </div>
        </div>
      </div>
      {isOpenComments && (
        <>
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
                text={`Ответ ${article.comments.find((comment) => comment.id === replyCommentId)?.authorUsername}`}
                onClose={() => setReplyCommentId(null)}
              />
            </div>
          )}
          <div className={style.article__send}>
            <TextareaAutosize
              className={style.article__send__textarea}
              minRows={1}
              maxRows={5}
              value={commentValue}
              onChange={handleCommentValue}
              placeholder="Прокомментируйте..."
            />
            <div className={style.article__send__controls}>
              <Button isCircle={true} title="Отправить" disabled={!isCorrectComment}>
                <SendSVG />
              </Button>
            </div>
          </div>
        </>
      )}
    </article>
  );
};

export default Article;
