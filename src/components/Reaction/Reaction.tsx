import { ReactionType } from '../../types/entities/reactionType';
import DislikeSVG from '../../ui/svg/DislikeSVG';
import LikeSVG from '../../ui/svg/LikeSVG';
import ShareSVG from '../../ui/svg/ShareSVG';
import style from './Reaction.module.scss';

interface ReactionProps {
  reaction: ReactionType;
}

const Reaction: React.FC<ReactionProps> = ({ reaction }) => {
  const renderReactionSVG = () => {
    switch (reaction.type) {
      case 'dislike':
        return <DislikeSVG />;
      case 'like':
        return <LikeSVG />;
      default:
        return <LikeSVG />;
    }
  }
  
  return (
    <article className={style.reaction}>
      <div className={style.reaction__content}>
        <b>{reaction.relatedType === 'article' ? 'К статье' : 'К комментарию'}</b>
        {renderReactionSVG()}
      </div>

      <ShareSVG />
    </article>
  );
};

export default Reaction;
