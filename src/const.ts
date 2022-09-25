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

export const SHOW_ITEMS_PER_PAGE_COUNT = 9;
export const SHOW_ITEMS_PER_PAGE_BEGIN_COUNT = 0;
