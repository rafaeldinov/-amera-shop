import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';

type Prop = {
  camera: Camera
}

const STARS_COUNT = 5;

const getStarRating = (rating: number) => (
  Array.from(Array(STARS_COUNT), (_, index) => (
    <img src={(index < rating) ? '/img/sprite/icon-full-star.svg' : '/img/sprite/icon-star.svg'} alt="star-rating icon" width="17" height="16" aria-hidden="true" key={index} />
  ))
);

export default function Card({camera}: Prop): JSX.Element {
  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x}`} />
          <img src={`/${camera.previewImg}`} srcSet={`/${camera.previewImg2x}`} width="280" height="240" alt={camera.name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {getStarRating(camera.rating)}
          <p className="visually-hidden">Рейтинг: {camera.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
        </div>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to={`/cameras/${camera.id}`}>Подробнее</Link>
      </div>
    </div>
  );
}
