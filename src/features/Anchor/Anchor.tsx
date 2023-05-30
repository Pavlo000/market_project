import {
  ReactComponent as ArrowUpIcon,
} from '../../assets/icons/arrows/up.svg';

import './Anchor.scss';

export const Anchor: React.FC = () => {
  return (
    <div className="Anchor">
      <a href="#top" className="Anchor__link">
        <ArrowUpIcon width={30} height={30} />
      </a>
    </div>
  );
};
