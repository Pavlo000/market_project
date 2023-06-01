import {
  ReactComponent as ArrowUpIcon,
} from '../../assets/icons/arrows/up.svg';

import './Anchor.scss';

export const Anchor: React.FC = () => {
  const handleScroll = () => window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });

  return (
    <div className="Anchor">
      <button type="button" onClick={handleScroll} className="Anchor__link">
        <ArrowUpIcon width={30} height={30} />
      </button>
    </div>
  );
};
