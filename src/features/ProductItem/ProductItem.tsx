import { content } from '../../constants/contents';
import { useAppSelector } from '../../app/hooks';

import { IProduct } from '../../types/Product';

import './ProductItem.scss';

type Props = {
  product: IProduct,
};

export const ProductItem: React.FC<Props> = ({ product }) => {
  const lang = useAppSelector(state => state.app.lang);
  const description = product.description
    .split(' ')
    .slice(0, 10)
    .join(' ')
    .slice(0, 50);

  const descriptionElement = (
    <p className="ProductItem__description form-text">
      {description}
      {description !== product.description && (
        <button type="button" className="ProductItem__button form-text link">
          {content[lang].productItem.readMoreLabel}
        </button>
      )}
    </p>
  );

  return (
    <div className="ProductItem">
      <div className="ProductItem__section">
        <img
          className="ProductItem__photo"
          src={product.images[0]}
          alt={product.title}
        />
      </div>
      <div className="ProductItem__section">

        <div className="ProductItem__block">
          <h4 className="ProductItem__title link">
            {product.title}
          </h4>
          <p className="ProductItem__subtitle regular-text">
            {product.subtitle}
          </p>
          {descriptionElement}
        </div>

        <div className="ProductItem__block">
          <p className="ProductItem__price regular-text">
            {`${product.price.value} ${product.price.currency}`}
          </p>
        </div>
      </div>
    </div>
  );
};
