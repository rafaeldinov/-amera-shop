import { Link } from 'react-router-dom';
import { CameraTabs, ESCAPE_KEY } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setIsActiveAddItemModal, setItemToBuy } from '../../store/camera-reducer/camera-reducer';
import { Camera } from '../../types/camera';
import RatingStars from '../rating-stars/rating-stars';

type Prop = {
  camera: Camera;
  isActive?: boolean;
}

export default function Card({camera, isActive}: Prop): JSX.Element {
  const dispatch = useAppDispatch();

  const handleModalEscKeydown = (evt: KeyboardEvent) => {
    if (evt.key === ESCAPE_KEY) {
      evt.preventDefault();
      closeModal();
    }
  };

  const openAddItemModalClick = () => {
    dispatch(setItemToBuy(camera));
    dispatch(setIsActiveAddItemModal(true));
    document.addEventListener('keydown', handleModalEscKeydown);
    document.body.classList.add('scroll-lock');
  };

  const closeModal = () => {
    dispatch(setIsActiveAddItemModal(false));
    document.body.classList.remove('scroll-lock');
    document.removeEventListener('keydown', handleModalEscKeydown);
  };

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
        <button onClick={openAddItemModalClick} className="btn btn--purple product-card__btn" type="button">Купить</button>
        <Link className="btn btn--transparent" to={`/camera/${camera.id}${CameraTabs.Info}`}>Подробнее</Link>
      </div>
    </div>
  );
}
