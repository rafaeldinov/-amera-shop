import { commerce, database, datatype, internet, image, random, lorem } from 'faker';
import { Camera } from './types/camera';
import { Review } from './types/review';
import { ReviewPost } from './types/review-post';

export const CAMERAS = 25;
const REVIEWS_COUNT = 10;

const MIN_ID = 1;
const VENDOR_CODE_COUNT = 7;
const MIN_RATING = 0;
const MAX_RATING = 5;
const MIN_PRICE = 1000;
const MAX_PRICE = 100000;

export const makeFakeCamera = (): Camera => ({
  id: datatype.number({ min: MIN_ID }),
  name: lorem.word(),
  vendorCode: random.alphaNumeric(VENDOR_CODE_COUNT),
  type: database.type(),
  category: lorem.word(),
  description: commerce.productDescription(),
  level: lorem.word(),
  rating: datatype.number({ min: MIN_RATING, max: MAX_RATING }),
  price: datatype.number({ min: MIN_PRICE, max: MAX_PRICE }),
  previewImg: image.image(),
  previewImg2x: image.image(),
  previewImgWebp: image.image(),
  previewImgWebp2x: image.image(),
  reviewCount: REVIEWS_COUNT
} as Camera);

export const makeFakeReview = (): Review => ({
  id: lorem.sentence(),
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.sentence(300, 50),
  rating: datatype.number({ min: 0, max: MAX_RATING }),
  createAt: datatype.datetime.toString(),
  cameraId: datatype.number({ min: MIN_ID }),
} as Review);

export const makeFakeComment = (): ReviewPost => ({
  cameraId: datatype.number({ min: MIN_ID }),
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.sentence(300, 50),
  rating: datatype.number({ min: 0, max: MAX_RATING }),
} as ReviewPost);

export const makeFakeGuitars = (quantity: number): Camera[] => (
  new Array(quantity).fill(null).map(makeFakeCamera) as Camera[]);

export const makeFakeReviews = (quantity: number): Review[] => (
  new Array(quantity).fill(null).map(makeFakeReview) as Review[]);

export const makeFakeComments = (quantity: number): ReviewPost[] => (
  new Array(quantity).fill(null).map(makeFakeComment) as ReviewPost[]);
