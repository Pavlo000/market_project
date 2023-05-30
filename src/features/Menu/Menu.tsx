import classNames from 'classnames';
import { Navigation } from '../Navigation';

import './Menu.scss';

type Props = {
  isOpen: boolean,
};

export const Menu: React.FC<Props> = ({ isOpen }) => {
  return (
    <div
      className={classNames(
        'Menu',
        { 'Menu--isOpen': isOpen },
        { 'Menu--isClosed': !isOpen },
      )}
    >
      <Navigation />
    </div>
  );
};
