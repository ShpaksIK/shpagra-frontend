import { CommentType } from '../../types/entities/commentType';
import CommentProfile from '../CommentProfile/CommentProfile';
import style from './CommentContainer.module.scss';

interface CommentContainerProps {
  maxVisible?: number;
  maxComments?: number;
  comments: CommentType[]
}

const CommentContainer: React.FC<CommentContainerProps> = ({ maxVisible, maxComments, comments }) => {
  const sliced = comments.slice(0, maxComments);

  return (
    <section className={style.commentContainer}>
      {sliced.map((comment) => (
        <CommentProfile key={comment.id} comment={comment} />
      ))}
    </section>
  );
};

export default CommentContainer;
