import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ProductItem } from '../ProductItem';
import './ProductList.scss';
import { getProductsAsync } from './productListSlice';
import { Loader } from '../Loader';

export const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.productList.products.status);
  const products = useAppSelector(state => state.productList.products.data);
  const location = useLocation();

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  return (
    <div className="ProductList">
      {status === 'loading' && <Loader />}

      {status === 'failed' && (
        <p className="uppercase">
          Something went wrong
        </p>
      )}
      <ul className="ProductList__list">
        {status === 'fullfield' && products.map(product => (
          <li key={product.id} className="ProductList__item">
            <Link to={location.pathname === `/product/${product.id}` ? '/' : `/product/${product.id}`} className="ProductList__link">
              <ProductItem product={product} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
