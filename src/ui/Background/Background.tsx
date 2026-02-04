import style from './Background.module.scss';

interface BackgroundProps {
  onClick?: () => void;
}

const Background: React.FC<BackgroundProps> = ({ onClick }) => {
  return <div className={style.background} onClick={() => onClick?.()}></div>;
};

export default Background;
