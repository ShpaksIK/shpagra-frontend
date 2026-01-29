import { ReactionType } from '../../types/entities/reactionType';
import Reaction from '../Reaction/Reaction';
import style from './ReactionContainer.module.scss';

interface ReactionContainerProps {
  maxVisible?: number;
  maxReactions?: number;
}

const ReactionContainer: React.FC<ReactionContainerProps> = ({ maxVisible, maxReactions }) => {
  const comments: ReactionType[] = [
    {
      id: 1,
      type: 'dislike',
      authorLogin: 'shp0ks',
      relatedId: 1,
      relatedType: 'article',
    },
    {
      id: 2,
      type: 'like',
      authorLogin: 'shp0ks',
      relatedId: 1,
      relatedType: 'post',
    },
    {
      id: 3,
      type: 'like',
      authorLogin: 'test',
      relatedId: 2,
      relatedType: 'article',
    },
  ];

  const sliced = comments.slice(0, maxReactions);

  return (
    <section className={style.reactionContainer}>
      {sliced.map((reaction) => (
        <Reaction key={`reaction-${reaction.id}`} reaction={reaction} />
      ))}
    </section>
  );
};

export default ReactionContainer;
