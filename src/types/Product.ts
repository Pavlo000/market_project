import { IProductDetails } from './ProductDetails';

export interface IProduct {
  id: string,
  name: string,
  location: string,
  year: number,
  condition: 'used' | 'new',
  availability: boolean,
  quantity: number,
  images: string[],
  description: string,
  price: {
    value: number,
    currency: 'RUB' | 'USD' | 'TRY' | 'GBP' | 'UAH' | 'EUR',
  },
  specs: IProductDetails,
}
