import { useState } from 'react';
import classNames from 'classnames';

import { content } from '../../constants/contents';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setPriceRange,
  setSortBy,
  unsetPriceRange,
  unsetSortBy,
} from './productFilterSlice';

import {
  ReactComponent as ArrowDownIcon,
} from '../../assets/icons/arrows/down.svg';

import './ProductFilter.scss';

export const ProductFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector(state => state.app.lang);
  const sortBy = useAppSelector(state => state.productFilter.sortBy);
  const [priceRangeLocal, setPriceRangeLocal] = useState<
  { min: null | number, max: null | number }
  >({ min: null, max: null });

  const handleClick = (value: string) => {
    switch (sortBy) {
      case `${value}-asc`:
        dispatch(setSortBy(`${value}-desc`));
        break;
      case `${value}-desc`:
        dispatch(setSortBy(''));
        break;
      default:
        dispatch(setSortBy(`${value}-asc`));
        break;
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case 'min-price':
        setPriceRangeLocal({ ...priceRangeLocal, min: +event.target.value });
        break;
      case 'max-price':
        setPriceRangeLocal({ ...priceRangeLocal, max: +event.target.value });
        break;
      default:
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (priceRangeLocal.min || priceRangeLocal.max) {
      dispatch(setPriceRange(priceRangeLocal));
    }
  };

  const handleReset = () => {
    dispatch(unsetPriceRange());
    dispatch(unsetSortBy());
    setPriceRangeLocal({ min: null, max: null });
  };

  return (
    <div className="ProductFilter">
      <div className="ProductFilter__section">
        <div className="ProductFilter__block">
          <p className="ProductFilter__title uppercase">
            {content[lang].productFilter.sortLabel}
          </p>
        </div>

        <div className="ProductFilter__block">
          <button
            type="button"
            className="ProductFilter__button uppercase small-text link"
            data-value={sortBy}
            onClick={() => handleClick('price')}
          >
            <span>
              {content[lang].productFilter.priceLabel}
            </span>
            <ArrowDownIcon
              className={classNames(
                'ProductFilter__arrow',
                { 'ProductFilter__arrow--down': sortBy === 'price-asc' },
                { 'ProductFilter__arrow--up': sortBy === 'price-desc' },
              )}
              width={20}
              height={20}
            />
          </button>
          <button
            type="button"
            className="ProductFilter__button uppercase small-text link"
            data-value={sortBy}
            onClick={() => handleClick('year')}
          >
            {content[lang].productFilter.yearLabel}
            <ArrowDownIcon
              className={classNames(
                'ProductFilter__arrow',
                { 'ProductFilter__arrow--down': sortBy === 'year-asc' },
                { 'ProductFilter__arrow--up': sortBy === 'year-desc' },
              )}
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      <div className="ProductFilter__section">
        <div className="ProductFilter__block">
          <p className="ProductFilter__title uppercase">
            {content[lang].productFilter.filterByPriceLabel}
            ,
            <span className="ProductFilter__currency">{' USD'}</span>
          </p>
        </div>

        <div className="ProductFilter__block">
          <form
            action="get"
            onSubmit={(event) => handleSubmit(event)}
            className="ProductFilter__form"
          >

            <label className="ProductFilter__label">
              <p className="uppercase small-text">
                {content[lang].productFilter.fromLabel}
              </p>
              <input
                type="number"
                name="price"
                id="min-price"
                min={0}
                className="ProductFilter__input"
                value={priceRangeLocal.min || 0}
                onChange={(event) => handleInput(event)}
              />
            </label>
            <label className="ProductFilter__label">
              <p className="uppercase small-text">
                {content[lang].productFilter.toLabel}
              </p>
              <input
                type="number"
                name="price"
                id="max-price"
                min={0}
                className="ProductFilter__input"
                value={priceRangeLocal.max || 0}
                onChange={(event) => handleInput(event)}
              />
            </label>

            <button
              type="submit"
              className="
                ProductFilter__button
                uppercase
                small-text
                link
              "
            >
              {content[lang].productFilter.setLabel}
            </button>
            <button
              type="button"
              className="
                ProductFilter__button
                uppercase
                small-text
                link
              "
              onClick={handleReset}
            >
              {content[lang].productFilter.resetLabel}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
