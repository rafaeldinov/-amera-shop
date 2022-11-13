export enum AppRoute {
  Root = '/',
  Catalog = '/catalog/:page',
  Sorted = ':sorted',
  Item = '/camera/:id/:tab',
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
  Info = 'info',
  Review = 'review'
}

export enum PageName {
  CatalogPage = 'catalogPage',
  CardPage = 'cardPage',
  BasketPage = 'basketPage'
}

export enum SortingMode {
  Default = 'default',
  PriceAscending = 'price_ascending',
  PriceDescending = 'price_descending',
  RatingAscending = 'rating_ascending',
  RatingDescending = 'rating_descending'
}

export const getPaginationPageCount = (allCameras: number) => Math.ceil(allCameras / ITEMS_PER_PAGE_COUNT);

export const getCamerasRangePerPage = (currentPage: number, allCameras: number) => {
  const start = ITEMS_PER_PAGE_COUNT * (currentPage - 1);
  const end = (currentPage === getPaginationPageCount(allCameras)) ? allCameras : ITEMS_PER_PAGE_COUNT * currentPage;
  return {start, end};
};

export const ITEMS_PER_PAGE_COUNT = 9;
export const REVIEWS_PER_STEP = 3;
export const SIMILAR_ITEMS_PER_STEP = 3;
export const START_PAGE_COUNT = 1;
