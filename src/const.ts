export enum AppRoute {
  Root = '/',
  Catalog = '/catalog/page_:number',
  Item = '/camera/:id/:tab',
  Basket = '/basket',
  NotFound = '/not-found'
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

export const getPaginagionPageCount = (allCameras: number) => Math.ceil(allCameras / ITEMS_PER_PAGE_COUNT);

export const getCamerasRangePerPage = (currentPage: number, allCameras: number) => {
  const start = ITEMS_PER_PAGE_COUNT * (currentPage - 1);
  const end = (currentPage === getPaginagionPageCount(allCameras)) ? allCameras : ITEMS_PER_PAGE_COUNT * currentPage;
  return {start, end};
};

export const ITEMS_PER_PAGE_COUNT = 9;
export const REVIEWS_PER_STEP = 3;
export const SIMILAR_ITEMS_PER_STEP = 3;
