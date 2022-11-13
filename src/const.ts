export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  Item = '/camera/:id',
  Basket = '/basket',
  NotFound = '/*'
}

export enum APIRoute {
  Cameras = '/cameras',
  PromoOffer = '/promo',
  Coupons = '/coupons',
  ReviewPost = '/reviews',
  Orders = '/orders',
}

export enum CameraTabs {
  Info = '#info',
  Review = '#review'
}

export enum PageName {
  CatalogPage = 'catalogPage',
  CardPage = 'cardPage',
  BasketPage = 'basketPage'
}

export enum SortType {
  Price = 'price',
  Rate = 'rating',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export const positiveIntegers = /^[0-9\b]+$/;
export const ITEMS_PER_PAGE_COUNT = 9;
export const REVIEWS_PER_STEP = 3;
export const SIMILAR_ITEMS_PER_STEP = 3;
export const START_PAGE_COUNT = 1;
