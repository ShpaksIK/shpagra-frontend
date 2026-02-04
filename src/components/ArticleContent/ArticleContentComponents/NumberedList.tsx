import style from './Components.module.scss';

interface NumberedListProps {
  list?: string[];
}

const NumberedList: React.FC<NumberedListProps> = ({ list }) => {
  return (
    <ol className={style.list}>
      {list?.map((content) => (
        <li>{content}</li>
      ))}
    </ol>
  );
};

export default NumberedList;
