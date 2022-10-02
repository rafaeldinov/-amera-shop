import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';
import StarRating from '../star-rating/star-rating';

type Prop = {
  camera: Camera;
  isActive?: boolean | undefined;
}

export default function Card({camera, isActive}: Prop): JSX.Element {
  return (
    <div className={isActive ? 'product-card is-active' : 'product-card'}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x}`} />
          <img src={`/${camera.previewImg}`} srcSet={`/${camera.previewImg2x}`} width="280" height="240" alt={camera.name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <StarRating rating={camera.rating} />
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
        <Link className="btn btn--transparent" to={`/camera/${camera.id}`}>Подробнее</Link>
      </div>
    </div>
  );
}
