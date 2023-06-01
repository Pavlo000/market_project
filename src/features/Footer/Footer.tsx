import { useAppSelector } from '../../app/hooks';

import { content } from '../../constants/contents';

import {
  ReactComponent as FacebookIcon,
} from '../../assets/icons/facebook.svg';
import {
  ReactComponent as TwitterIcon,
} from '../../assets/icons/twitter.svg';

import { Navigation } from '../Navigation';

import './Footer.scss';

export const Footer: React.FC = () => {
  const lang = useAppSelector(state => state.app.lang);

  return (
    <footer className="Footer">
      <div className="Footer__section">
        <Navigation />
      </div>

      <div className="Footer__section">
        <span className="Footer__subtitle regular-text">
          {content[lang].footer.socialLabel}
          :
        </span>
        <ul className="Footer__list">
          <li className="Footer__item">
            <a href="https://www.facebook.com/" className="Footer__link link">
              <FacebookIcon width={18} height={18} />
            </a>
          </li>
          <li className="Footer__item">
            <a href="https://www.twitter.com/" className="Footer__link link">
              <TwitterIcon width={18} height={18} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
