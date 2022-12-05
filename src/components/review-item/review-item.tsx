import RatingStars from '../rating-stars/rating-stars';
import { Review } from '../../types/review';
import { DateFormat } from '../../const';

type Props = {
  review: Review
}

const getReviewDate = (date: string, format: string)=> {
  if(format === DateFormat.DateTime) {
    const [day, month, year] = new Date(date).toLocaleDateString().split('/');
    return `${year}-${month}-${day}`;
  }
  return new Date(date).toLocaleString('ru-ru', { month:'long', day:'numeric'});
};


export default function ReviewItem({review}: Props): JSX.Element {
  return (
    <li className="review-card" data-testid="review">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime={getReviewDate(review.createAt, DateFormat.DateTime)}>{getReviewDate(review.createAt, DateFormat.Date)}</time>
      </div>
      <div className="rate review-card__rate">
        <RatingStars rating={review.rating} />
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
}
