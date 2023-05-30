import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { content } from '../../constants/contents';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProductAsync } from './productDetailsSlice';

import { ReactComponent as CrossIcon } from '../../assets/icons/cross.svg';
import { Slider } from '../Slider';
import { Loader } from '../Loader';

import './ProductDetails.scss';

export const ProductDetails: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const product = useAppSelector(state => state.productDetails.product.data);
  const status = useAppSelector(state => state.productDetails.product.status);
  const lang = useAppSelector(state => state.app.lang);

  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
  });

  useEffect(() => {
    if (id) {
      dispatch(getProductAsync(id));
    }
  }, [dispatch, id]);

  return (
    <div className="ProductDetails">
      {status === 'loading' && <Loader />}

      {status === 'failed' && (
        <p className="uppercase">
          Something went wrong
        </p>
      )}
      {status === 'fullfield' && product && (
        <>
          {currentWidth < 640 && (
            <Link
              to="/"
              className="ProductDetails__close"
            >
              <CrossIcon height={34} width={34} color="#eaeaea" />
            </Link>
          )}
          <div className="ProductDetails__slider">
            <Slider
              images={product.images}
            />
          </div>
          <div className="ProductDetails__details">
            <h2 className="ProductDetails__title">{product.name}</h2>
            <table className="ProductDetails__table">
              <tbody>
                <tr>
                  <th className="medium-text">
                    {`${content[lang].productDetails.yearLabel}:`}
                  </th>
                  <td>{product.year}</td>
                </tr>
                <tr>
                  <th className="medium-text">
                    {`${content[lang].productDetails.locationLabel}:`}
                  </th>
                  <td>{product.location}</td>
                </tr>
                <tr>
                  <th className="medium-text">
                    {`${content[lang].productDetails.priceLabel}:`}
                  </th>
                  <td>
                    {`${product.price.value} ${product.price.currency}`}
                  </td>
                </tr>
                {Object.entries(product.specs).map(row => (
                  <tr>
                    <th className="medium-text">
                      {row[0]}
                      :
                    </th>
                    <td>{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="ProductDetails__article">
              <h5 className="ProductDetails__article-title">
                {`${content[lang].productDetails.descriptionLabel}:`}
              </h5>
              {product.description}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
