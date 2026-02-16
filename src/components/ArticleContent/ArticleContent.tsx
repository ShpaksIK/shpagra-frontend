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

  let titleCount = 0;

  return (
    <div className={style.content}>
      {content.map((block) => {
        switch (block.type) {
          case 'title':
            titleCount += 1;
            return <Title key={`${block.type}-${block}`} text={block.text} hrefId={titleCount} />;
          case 'text':
            return <Text key={`${block.type}-${block}`} text={block.text} />;
          case 'quote':
            return <Quote key={`${block.type}-${block}`} text={block.text} />;
          case 'img':
            return <Image key={`${block.type}-${block}`} src={block.src} text={block.text} />;
          case 'ol':
            return <NumberedList key={`${block.type}-${block}`} list={block.list} />;
          case 'ul':
            return <BulletedList key={`${block.type}-${block}`} list={block.list} />;
        }
      })}
    </div>
  );
};

export default ArticleContent;
