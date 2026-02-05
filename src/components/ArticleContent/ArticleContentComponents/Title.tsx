import style from './Components.module.scss';

interface TitleProps {
  text?: string;
  hrefId: number;
}

const Title: React.FC<TitleProps> = ({ text, hrefId }) => {
  return (
    <h3 id={`title-${hrefId}`} className={style.title}>
      {text}
    </h3>
  );
};

export default Title;
