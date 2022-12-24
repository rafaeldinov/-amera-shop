import { useState, useEffect } from 'react';
import { ESCAPE_KEY, REVIEWS_PER_STEP } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsAction } from '../../store/api-action';
import { setIsActiveReviewModal } from '../../store/modal-reducer/modal-reducer';
import { getSortedReviews } from '../../store/camera-reducer/selectors';
import ReviewItem from '../review-item/review-item';

type Props = {
  id?: string;
}

export default function Reviews({id}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getSortedReviews);
  const [renderedReviews, setRenderedReviews] = useState(REVIEWS_PER_STEP);

  useEffect(() => {
    if(id) {
      dispatch(fetchReviewsAction(id));
    }
  }, [dispatch, id]);

  const handleShowMoreButtonClick = () => setRenderedReviews(renderedReviews + REVIEWS_PER_STEP);
  const handleToTopClick = () => window.scrollTo({top: 0, left: 0, behavior: 'smooth' });

  const closeReviewModal = () => {
    dispatch(setIsActiveReviewModal(false));
    document.body.classList.remove('scroll-lock');
    document.removeEventListener('keydown', handleModalEscKeydown);
  };

  const handleModalEscKeydown = (evt: KeyboardEvent) => {
    if (evt.key === ESCAPE_KEY) {
      evt.preventDefault();
      closeReviewModal();
    }
  };

  const handleOpenModalReviewClick = () => {
    document.addEventListener('keydown', handleModalEscKeydown);
    dispatch(setIsActiveReviewModal(true));
    document.body.classList.add('scroll-lock');
  };

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button onClick={handleOpenModalReviewClick} className="btn" type="button">Оставить свой отзыв</button>
        </div>
        <ul className="review-block__list">
          {reviews.slice(0, renderedReviews).map((item) => (
            <ReviewItem key={item.id} review={item} />
          ))}
        </ul>
        <div className="review-block__buttons">
          {(renderedReviews < reviews.length) && <button onClick={handleShowMoreButtonClick} className="btn btn--purple" type="button">Показать больше отзывов</button>}
          {(renderedReviews >= reviews.length) && <button onClick={handleToTopClick} className="btn btn--purple" type="button">Наверх</button>}
        </div>
      </div>
    </section>
  );
}
