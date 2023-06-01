import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { ReactComponent as CrossIcon } from '../../assets/icons/cross.svg';
import { content } from '../../constants/contents';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onSearch } from './searchBarSlice';

import './SearchBar.scss';

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [localSearch, setLocalSearch] = useState('');
  const lang = useAppSelector(state => state.app.lang);
  const search = useAppSelector(state => state.searchBar.input);

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (content) {
      navigate('');
      dispatch(onSearch(localSearch));
    }
  };

  const handleCross = () => {
    setLocalSearch('');
    dispatch(onSearch(''));
  };

  return (
    <div className="SearchBar">
      <label
        className="SearchBar__label"
        htmlFor="search-bar"
      >
        <SearchIcon height={18} width={18} />
      </label>

      <form
        method="get"
        onSubmit={(event) => handleSubmit(event)}
        className="SearchBar__form"
      >
        <input
          type="text"
          className="SearchBar__input regular-text"
          placeholder={content[lang].searchBar.searchLabel}
          id="search-bar"
          onChange={(event) => handleClick(event)}
          value={localSearch}
        />
        {search && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div
            tabIndex={0}
            role="button"
            onClick={handleCross}
            className="SearchBar__cross"
          >
            <CrossIcon width={18} height={18} color="#fff" />
          </div>
        )}
      </form>
    </div>
  );
};
