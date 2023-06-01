import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ProductItem } from '../ProductItem';
import './ProductList.scss';
import { getProductsAsync } from './productListSlice';
import { Loader } from '../Loader';

export const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const status = useAppSelector((state) => state.productList.products.status);
  const products = useAppSelector(state => state.productList.products.data);
  const search = useAppSelector(state => state.searchBar.input);
  const sortdBy = useAppSelector(state => state.productFilter.sortBy);
  const priceRange = useAppSelector(state => state.productFilter.priceRange);
  const [visibleProducts, setVisibleProducts] = useState(products);

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    const normalizeSearch = search.trim().toLowerCase();

    const filteredProducts = products
      .filter(product => (
        product.title.toLowerCase().includes(normalizeSearch)
      ))
      .filter(product => (
        product.price.value > (priceRange.min || 0)
          && product.price.value < (priceRange.max || 99999999)
      ));

    const sortedProducts = filteredProducts.sort((a, b) => {
      switch (sortdBy) {
        case 'price-asc':
          return a.price.value - b.price.value;
        case 'price-desc':
          return b.price.value - a.price.value;
        case 'year-asc':
          return a.year - b.year;
        case 'year-desc':
          return b.year - b.year;
        default:
          return 0;
      }
    });

    setVisibleProducts(sortedProducts);
  }, [!!products.length, search, sortdBy, priceRange.max, priceRange.min]);

  return (
    <div className="ProductList">
      {status === 'loading' && <Loader />}

      {status === 'failed' && (
        <p className="uppercase">
          Something went wrong
        </p>
      )}
      <ul className="ProductList__list">
        {status === 'fullfield' && visibleProducts.map(product => (
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
