import style from './Components.module.scss';

interface QouteProps {
  text?: string;
}

const Quote: React.FC<QouteProps> = ({ text }) => {
  return (
    <div className={style.quote}>
      <p>{text}</p>
    </div>
  );
};

export default Quote;
