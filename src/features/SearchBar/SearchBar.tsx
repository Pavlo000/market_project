import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { content } from '../../constants/contents';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onSearch } from './searchBarSlice';

import './SearchBar.scss';

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [localSearch, setLang] = useState('');
  const lang = useAppSelector(state => state.app.lang);

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLang(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (content) {
      navigate('');
      dispatch(onSearch(localSearch));
    }
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
          className="SearchBar__input"
          placeholder={content[lang].searchBar.searchLabel}
          id="search-bar"
          onChange={(event) => handleClick(event)}
        />
      </form>
    </div>
  );
};
