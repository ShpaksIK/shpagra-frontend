import { CommentType } from '../../types/entities/commentType';
import CommentProfile from '../CommentProfile/CommentProfile';
import style from './CommentContainer.module.scss';

interface CommentContainerProps {
  maxVisible?: number;
  maxComments?: number;
}

const CommentContainer: React.FC<CommentContainerProps> = ({ maxVisible, maxComments }) => {
  const comments: CommentType[] = [
    {
      id: 1,
      content: 'Test comment',
      createdAt: Date.now(),
      updatedAt: null,
      authorLogin: 'skebob',
      authorUsername: 'Матвей',
      authorAvatar: null,
      parent: null,
      relatedId: 1,
      relatedType: 'article',
      reactions: [],
    },
    {
      id: 2,
      content: 'Test comment 2',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      authorLogin: 'skebob2',
      authorUsername: 'Матвей 2',
      authorAvatar: null,
      parent: {
        id: 1,
        authorUsername: 'Матвей',
        relatedType: 'article',
        text: 'Test comment',
      },
      relatedId: 1,
      relatedType: 'article',
      reactions: [],
    },
  ];

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
