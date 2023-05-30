import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { ReactComponent as LogoIcon } from '../../assets/icons/logo.svg';
import { ReactComponent as CrossIcon } from '../../assets/icons/cross.svg';
import {
  ReactComponent as ArrowDownIcon,
} from '../../assets/icons/arrows/down.svg';
import './Header.scss';
import { SearchBar } from '../SearchBar';
import { Menu } from '../Menu';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { content } from '../../constants/contents';
import { changeLang } from '../../appSlice';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector(state => state.app.lang);

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenLang, setIsOpenLang] = useState(false);

  const MenuClickElement = isOpenMenu ? CrossIcon : ArrowDownIcon;

  const listOfLanguages = Object
    .entries(content[lang].header.langLabels)
    .map(language => {
      const languageCode = language[0].slice(0, 2);
      const languageLabel = language[1];

      return (
        <li
          className="dropdown__item"
          key={languageCode}
          data-value={languageLabel}
        >
          <button
            type="button"
            className={classNames(
              'dropdown__link',
              {
                'dropdown__link--active': lang === languageCode,
              },
            )}
            onClick={() => {
              dispatch(changeLang(languageCode as 'ru' | 'en'));
            }}
          >
            {languageLabel}
          </button>
        </li>
      );
    });

  return (
    <header className="Header">
      <Link className="Header__logo" to="/">
        <LogoIcon />
      </Link>

      <div className="Header__search">
        <SearchBar />
      </div>

      <div className="Header__dropdown">
        <div
          className="dropdown"
          onMouseLeave={() => setIsOpenLang(false)}
        >
          <button
            type="button"
            data-value={lang}
            className="dropdown__button"
            onMouseMove={() => setIsOpenLang(true)}
          >
            {content[lang].header.languageLabel}
          </button>
          <ul className={classNames(
            'dropdown__list',
            { 'dropdown__list--active': isOpenLang },
          )}
          >
            {listOfLanguages}
          </ul>
        </div>
      </div>

      <div className="Header__menu">
        <button
          className="Header__button"
          type="button"
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          <MenuClickElement height={25} width={25} />
        </button>

        <Menu isOpen={isOpenMenu} />
      </div>
    </header>
  );
};
