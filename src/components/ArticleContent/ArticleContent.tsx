import { ArticleContentType } from '../../types/entities/articleType';
import style from './ArticleContent.module.scss';
import BulletedList from './ArticleContentComponents/BulletedList';
import Image from './ArticleContentComponents/Image';
import NumberedList from './ArticleContentComponents/NumberedList';
import Quote from './ArticleContentComponents/Quote';
import Text from './ArticleContentComponents/Text';
import Title from './ArticleContentComponents/Title';

interface ArticleContentProps {
  content: ArticleContentType[];
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  if (content.length === 0) {
    return <p className={style.content__noContent}>Автор статьи ничего не написал</p>;
  }

  return (
    <div className={style.content}>
      {content.map((block) => {
        switch (block.type) {
          case 'title':
            return <Title text={block.text} />;
          case 'text':
            return <Text text={block.text} />;
          case 'quote':
            return <Quote text={block.text} />;
          case 'img':
            return <Image src={block.src} text={block.text} />;
          case 'ol':
            return <NumberedList list={block.list} />;
          case 'ul':
            return <BulletedList list={block.list} />;
        }
      })}
    </div>
  );
};

export default ArticleContent;
