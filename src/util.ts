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

export const getBasket = (): Camera[] => {
  const items = localStorage.getItem('basket');
  return items ? JSON.parse(items) : [];
};

export const saveToBasket = (item: Camera) => {
  const items = getBasket();
  items.push(item);
  localStorage.setItem('basket', JSON.stringify(items));
};

export const deleteFromBasket = (item: Camera): void => localStorage.removeItem(`${item.id}`);
