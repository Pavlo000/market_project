import { IProduct } from '../types/Product';

// eslint-disable-next-line max-len
const BASE_URL = 'https://market-project-4c9a4-default-rtdb.europe-west1.firebasedatabase.app';

export class ProductService {
  getProducts = async ():Promise<IProduct[]> => {
    const data = await fetch(`${BASE_URL}/products.json`);
    const dataJSON = await data.json();

    const normalizeData = Object
      .entries<IProduct>(dataJSON)
      .map(el => ({
        ...el[1],
        id: el[0],
      }));

    return normalizeData;
  }

  getProduct = async (id: string):Promise<IProduct> => {
    const data = await fetch(`${BASE_URL}/products/${id}.json`);
    const dataJSON = await data.json();

    return dataJSON;
  }
}
