import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { content } from '../../constants/contents';

import './Navigation.scss';

export const Navigation: React.FC = () => {
  const lang = useAppSelector(state => state.app.lang);

  return (
    <nav className="Navigation">
      <ul className="Navigation__list">
        <li className="Navigation__item">
          <Link to="/contacts" className="Navigation__link link">
            {content[lang].navigation.aboutLabel}
          </Link>
        </li>
        <li className="Navigation__item">
          <Link to="/contacts" className="Navigation__link link">
            {content[lang].navigation.contactLabel}
          </Link>
        </li>
        <li className="Navigation__item">
          <Link to="/contacts" className="Navigation__link link">
            {content[lang].navigation.polisyLabel}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
