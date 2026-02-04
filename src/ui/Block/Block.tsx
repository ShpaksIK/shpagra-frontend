import classNames from 'classnames';

import style from './Block.module.scss';

interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Block: React.FC<BlockProps> = ({ children, className, ...rest }) => {
  return (
    <div className={classNames(style.block, className)} {...rest}>
      {children}
    </div>
  );
};

export default Block;
