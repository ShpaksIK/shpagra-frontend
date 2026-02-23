import { useState } from 'react';

import { ReactionType } from '../../types/entities/reactionType';
import Block from '../../ui/Block/Block';
import ArrowSVG from '../../ui/svg/ArrowSVG';
import DislikeSVG from '../../ui/svg/DislikeSVG';
import HeartSVG from '../../ui/svg/HeartSVG';
import LikeSVG from '../../ui/svg/LikeSVG';
import ShareSVG from '../../ui/svg/ShareSVG';
import style from './Reaction.module.scss';
import classNames from 'classnames';
import A from '../../ui/A/A';

interface ReactionProps {
  reaction: ReactionType;
}

const Reaction: React.FC<ReactionProps> = ({ reaction }) => {
  const renderReactionSVG = () => {
    switch (reaction.content) {
      case 'dislike':
        return <DislikeSVG />;
      case 'like':
        return <LikeSVG />;
      case 'heart':
        return <HeartSVG />;
    }
  };

  const [isOpenInfo, setOpenInfo] = useState(false);

  return (
    <article className={style.reaction}>
      <Block
        className={classNames(style.reaction__block, !isOpenInfo || style.reaction__block_open)}
      >
        <div className={style.reaction__content}>
          <div
            className={style.reaction__content__arrow}
            onClick={() => setOpenInfo((prev) => !prev)}
          >
            <ArrowSVG rotate={isOpenInfo ? 180 : 0} size={20} />
          </div>
          <b>{reaction.type_entity === 'article' ? 'К статье' : 'К комментарию'}</b>
          {renderReactionSVG()}
        </div>

        <ShareSVG />
      </Block>

      {isOpenInfo && (
        <Block className={style.reaction__info}>
          {reaction.type_entity === 'comment' && (
            <div className={style.reaction__info_comment}>
              <p>{reaction.text}</p>
            </div>
          )}

          {reaction.type_entity === 'article' && (
            <div className={style.reaction__info_article}>
              <b>{reaction.text}</b>
              <br />
              <A to={`/article/${reaction.id_entity}`}>Перейти</A>
            </div>
          )}
        </Block>
      )}
    </article>
  );
};

export default Reaction;
