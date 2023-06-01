import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { content } from '../../constants/contents';
import { useAppSelector } from '../../app/hooks';

import './Pagination.scss';

type Props = {
  length: number,
  currentPage: number,
  offset: number,
  visiblePages: number,
};

export const Pagination: React.FC<Props> = ({
  length,
  currentPage,
  offset,
  visiblePages,
}) => {
  const lang = useAppSelector(state => state.app.lang);
  const visibleSiblings = visiblePages / 2;
  const chunks = Math.ceil(length / offset);
  const start = currentPage - visibleSiblings > 0
    ? currentPage - visibleSiblings
    : 0;
  const end = currentPage + visibleSiblings;
  const links = Array(chunks)
    .fill(null)
    .map((_, i) => i + 1)
    .slice(start, end);

  const handleScroll = () => window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });

  const minPage = 1;
  const maxPage = links[links.length - 1];
  const prevPage = currentPage > minPage ? currentPage - 1 : minPage;
  const nextPage = currentPage < maxPage ? currentPage + 1 : maxPage;

  return (
    <div className="Pagination">
      <Link
        className={classNames(
          'Pagination__link',
          'link',
          'button',
          { 'Pagination__link--disabled': currentPage === minPage },
        )}
        to={`/products/${prevPage}`}
        onClick={handleScroll}
        aria-disabled={currentPage === minPage}
      >
        {content[lang].pagination.prevLabel}
      </Link>

      <ul className="Pagination__list">
        {links.map(link => (
          <li key={link} className="Pagination__item">
            <Link
              to={`/products/${link}`}
              onClick={handleScroll}
              className={classNames(
                'Pagination__link',
                'button',
                'link',
                { 'button--active': currentPage === link },
              )}
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        className={classNames(
          'Pagination__link',
          'link',
          'button',
          { 'Pagination__link--disabled': currentPage === maxPage },
        )}
        to={`/products/${nextPage}`}
        onClick={handleScroll}
        aria-disabled={currentPage === maxPage}
      >
        {content[lang].pagination.nextLabel}
      </Link>
    </div>
  );
};
