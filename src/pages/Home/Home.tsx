import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { ProductList } from '../../features/ProductList';
import { ProductDetails } from '../../features/ProductDetails';

import './Home.scss';
import { ProductFilter } from '../../features/ProductFilter';

export const Home: React.FC = () => {
  const location = useLocation();
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const isOpenRightElem = location.pathname.match(/product\/.+/);

  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
  });

  const leftBlock = (
    <div
      className={
        classNames(
          'Home__block',
          'Home__block--left',
          { 'Home__block--left_grid': currentWidth > 640 && isOpenRightElem },
        )
      }
    >
      <ProductList />
    </div>
  );

  const rightBlock = (
    <div className="Home__block Home__block--right">
      <ProductDetails />
    </div>
  );

  return (
    <main className="Home">
      {location.pathname.match(/products\/\d+$|^\/$/) && (
        <div className="Home__section">
          <ProductFilter />
        </div>
      )}
      <div className="Home__section Home__section--grid">
        {currentWidth < 640 ? !isOpenRightElem && leftBlock : leftBlock}
        <Routes>
          <Route
            path="/product/:id"
            element={rightBlock}
          />
        </Routes>
      </div>
    </main>
  );
};
