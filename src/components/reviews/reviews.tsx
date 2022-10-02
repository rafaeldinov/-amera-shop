import { SyntheticEvent, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsAction } from '../../store/api-action';
import { setIsActiveProductReviewModal } from '../../store/camera-reducer/camera-reducer';
import { getReviews } from '../../store/camera-reducer/selectors';
import { Review } from '../../types/review';
import ReviewItem from '../review-item/review-item';

type Props = {
  id: string | undefined;
}
export default function Reviews({id}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const sortedReviews = reviews.slice().sort((a: Review , b: Review) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
  const [nextReviews, setNextReviews] = useState(3);

  useEffect(() => {
    if(id) {
      dispatch(fetchReviewsAction(id));
    }
  }, [dispatch, id]);

  const handleMoreReviewsButton = (evt: SyntheticEvent) => {
    if(evt.currentTarget.textContent === 'Наверх') {
      return window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }
    const lastReviews = sortedReviews.length % 3;
    if(nextReviews + lastReviews === sortedReviews.length) {
      setNextReviews(nextReviews + lastReviews);
    }else {
      setNextReviews(nextReviews + 3);
    }
  };

  const handleOpenModalReviewClick = () => dispatch(setIsActiveProductReviewModal(true));

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button onClick={handleOpenModalReviewClick} className="btn" type="button">Оставить свой отзыв</button>
        </div>
        <ul className="review-block__list">
          {sortedReviews.slice(0, nextReviews).map((item) => (
            <ReviewItem key={item.id} review={item} />
          ))}
        </ul>
        <div className="review-block__buttons">
          {
            (nextReviews !== sortedReviews.length && sortedReviews.length > 3) ?
              <button onClick={handleMoreReviewsButton} className="btn btn--purple" type="button">Показать больше отзывов</button>
              :
              <button onClick={handleMoreReviewsButton} className="btn btn--purple" type="button">Наверх</button>
          }
        </div>
      </div>
    </section>
  );
}
