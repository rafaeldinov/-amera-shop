import { CartItem } from './types/cart-item';
import { Camera } from './types/camera';
import { Filters } from './types/filters';
import { Sort } from './types/sort';

export const getQuerySort = (sort?: Sort) => sort?.sortType && sort?.sortOrder ? `&_sort=${sort?.sortType}&_order=${sort?.sortOrder}` : '';

export const getType = (filters?: Filters) => {
  const type = {
    digital: (filters?.type.digital) ? '&type=Цифровая' : '',
    film: (filters?.type.film) ? '&type=Плёночная' : '',
    snapshot: (filters?.type.snapshot) ? '&type=Моментальная' : '',
    collection: (filters?.type.collection) ? '&type=Коллекционная' : '',
  };
  return `${type.digital}${type.film}${type.snapshot}${type.collection}`;
};

export const getCategory = (filters?: Filters) => {
  const cameraCategory = {
    photo: (filters?.category.photoCamera) ? '&category=Фотоаппарат' : '',
    video: (filters?.category.videoCamera) ? '&category=Видеокамера' : '',
  };
  return `${cameraCategory.photo}${cameraCategory.video}`;
};

export const getLevel = (filters?: Filters) => {
  const level = {
    zero: (filters?.level.zero) ? '&level=Нулевой' : '',
    amateur: (filters?.level.amateur) ? '&level=Любительский' : '',
    professional: (filters?.level.professional) ? '&level=Профессиональный' : '',
  };
  return `${level.zero}${level.amateur}${level.professional}`;
};

export const getQueryFilters = (filters?: Filters) => {
  const queryFilters =
  `${filters?.category ? getCategory(filters) : ''}` +
  `${filters?.type ? getType(filters) : ''}` +
  `${filters?.level ? getLevel(filters) : ''}` +
  `${filters?.minPrice ? `&price_gte=${filters?.minPrice}` : ''}` +
  `${filters?.maxPrice ? `&price_lte=${filters?.maxPrice}` : ''}`;
  return queryFilters;
};

export const getBasket = (): CartItem[] => {
  const items = localStorage.getItem('basket');
  return items ? JSON.parse(items) : [];
};

export const saveToBasket = (camera: Camera | CartItem, quantity?: number) => {
  const basketItems = getBasket();
  const index = (basketItems?.findIndex((item) => item.id === camera.id));

  if(index === -1) {
    basketItems.push({...camera, quantity: 1});
  }
  if(index !== -1 && !quantity) {
    basketItems[index] = {...basketItems[index], quantity: basketItems[index].quantity + 1};
  }
  if(quantity) {
    basketItems[index] = {...basketItems[index], quantity};
  }

  localStorage.setItem('basket', JSON.stringify(basketItems));
};

export const deleteFromBasket = (camera: CartItem) => {
  const basketItems = getBasket();
  const index = (basketItems?.findIndex((item) => item.id === camera.id));
  basketItems.splice(index, 1);
  localStorage.setItem('basket', JSON.stringify(basketItems));
};
