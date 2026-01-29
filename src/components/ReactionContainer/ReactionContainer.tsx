import { ReactionType } from '../../types/entities/reactionType';
import Reaction from '../Reaction/Reaction';
import style from './ReactionContainer.module.scss';

interface ReactionContainerProps {
  maxVisible?: number;
  maxReactions?: number;
  reactions: ReactionType[];
}

const ReactionContainer: React.FC<ReactionContainerProps> = ({
  maxVisible,
  maxReactions,
  reactions,
}) => {
  const sliced = reactions.slice(0, maxReactions);

  return (
    <section className={style.reactionContainer}>
      {sliced.map((reaction) => (
        <Reaction key={`reaction-${reaction.id}`} reaction={reaction} />
      ))}
    </section>
  );
};

export default ReactionContainer;
