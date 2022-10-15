import { Link } from 'react-router-dom';
import { CameraTabs } from '../../const';
import { Camera } from '../../types/camera';
import RatingStars from '../rating-stars/rating-stars';

type Prop = {
  camera: Camera;
  isActive?: boolean;
}

export default function Card({camera, isActive}: Prop): JSX.Element {
  return (
    <div className={isActive ? 'product-card is-active' : 'product-card'} data-testid="div-id">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x}`} />
          <img src={`/${camera.previewImg}`} srcSet={`/${camera.previewImg2x}`} width="280" height="240" alt={camera.name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStars rating={camera.rating} />
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
        <Link className="btn btn--transparent" to={`/camera/${camera.id}/${CameraTabs.Review}`}>Подробнее</Link>
      </div>
    </div>
  );
}
