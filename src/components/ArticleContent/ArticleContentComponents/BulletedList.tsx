import classNames from 'classnames';
import style from './Components.module.scss';

interface BulletedListProps {
  list?: string[];
}

const BulletedList: React.FC<BulletedListProps> = ({ list }) => {
  return (
    <ul className={classNames(style.list, style.list_ul)}>
      {list?.map((content) => (
        <li>{content}</li>
      ))}
    </ul>
  );
};

export default BulletedList;
