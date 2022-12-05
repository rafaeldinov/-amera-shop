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

export const DefaultFiters = {
  category: {
    photoCamera: false,
    videoCamera: false,
  },
  type: {
    digital: false,
    film: false,
    snapshot: false,
    collection: false,
  },
  level: {
    zero: false,
    amateur: false,
    professional: false,
  },
  minPrice: undefined,
  maxPrice: undefined,
};

export enum InputPriceName {
  Price = 'price',
  PriceUp = 'priceUp',
}

export enum CameraCategory {
  Photocamera = 'photocamera',
  Videocamera = 'videocamera',
}

export enum CameraType {
  Digital = 'digital',
  Film = 'film',
  Snapshot = 'snapshot',
  Collection = 'collection',
}

export enum CameraLevel {
  Zero = 'zero',
  NonProfessional = 'non-professional',
  Professional = 'professional',
}

export const DateFormat = {
  DateTime: 'dateTime',
  Date: 'date',
};

export const positiveIntegers = /^[0-9\b]+$/;
export const ITEMS_PER_PAGE_COUNT = 9;
export const REVIEWS_PER_STEP = 3;
export const SIMILAR_ITEMS_PER_STEP = 3;
export const START_PAGE_COUNT = 1;
export const ENTER_KEY = 'Enter';
export const ESCAPE_KEY = 'Escape';
