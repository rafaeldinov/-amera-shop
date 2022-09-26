export enum AppRoute {
  Root = '/',
  Catalog = '/catalog/page_:number',
  Item = '/cameras/:id',
  Basket = '/basket',
  NotFound = '*'
}

export enum APIRoute {
  Cameras = '/cameras',
  PromoOffer = '/promo',
  Coupons = '/coupons',
  Reviews = '/reviews',
  Orders = '/orders',
}

export const getPaginagionPageCount = (allCameras: number) => Math.ceil(allCameras / ITEMS_PER_PAGE_COUNT);

export const getCamerasRangePerPage = (currentPage: number, allCameras: number) => {
  const lastPageItemCount = allCameras % ITEMS_PER_PAGE_COUNT;
  const start = ITEMS_PER_PAGE_COUNT * currentPage - ITEMS_PER_PAGE_COUNT;
  let end = ITEMS_PER_PAGE_COUNT * currentPage;
  if(currentPage === getPaginagionPageCount(allCameras)) {
    end = ITEMS_PER_PAGE_COUNT * currentPage - lastPageItemCount - 1;
  }
  return {start, end};
};

export const ITEMS_PER_PAGE_COUNT = 9;
export const ITEMS_PER_PAGE_BEGIN_COUNT = 0;
