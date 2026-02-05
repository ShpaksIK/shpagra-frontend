import style from './ArticlePage.module.scss';
import Block from '../../ui/Block/Block';
import { useNavigateArticle } from '../../hooks/useNavigateArticle';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import ProfileLoading from '../../components/ProfileLoading/ProfileLoading';
import { getArticle } from '../../redux/slices/articleSlice/api';
import IconButton from '../../ui/IconButton/IconButton';
import ShareSVG from '../../ui/svg/ShareSVG';
import Avatar from '../../ui/Avatar/Avatar';
import { formatTimestamp } from '../../utils/dateFormatter';
import CommentContainer from '../../components/CommentContainer/CommentContainer';
import ArticleContent from '../../components/ArticleContent/ArticleContent';
import LayoutArticle from '../../components/Layouts/LayoutArticle/LayoutArticle';

interface ArticlePageProps {
  articleId: number;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ articleId }) => {
  useNavigateArticle();

  const dispatch = useAppDispatch();
  const article = useAppSelector((state) => state.article.article);

  useEffect(() => {
    dispatch(getArticle(articleId));
  }, [articleId]);

  if (!article) {
    return <ProfileLoading />;
  }

  const formatDate = formatTimestamp(article.createdAt);

  return (
    <LayoutArticle articleTitles={article.content.filter((e) => e.type === 'title')}>
      <Block className={style.header}>
        <div className={style.header__controls}>
          <IconButton icon={<ShareSVG />} onClick={() => {}} />
        </div>

        <div className={style.header__author}>
          <Avatar
            profileAvatar={article.authorAvatar}
            profileId={article.authorLogin}
            username={article.authorUsername}
          />
          <p>{formatDate}</p>
        </div>

        <h2>{article.title}</h2>
        <p>{article.description}</p>
        {article.banner && <img src={article.banner} alt="Баннер" />}
      </Block>

      <Block>
        <ArticleContent content={article.content} />
      </Block>

      <Block>
        <h2>Комментарии</h2>
        <CommentContainer comments={article.comments} />
      </Block>
    </LayoutArticle>
  );
};

export default ArticlePage;
