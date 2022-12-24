import { Link } from 'react-router-dom';
import { AppRoute, CameraTabs, ESCAPE_KEY } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setItemToBuy } from '../../store/cart-reducer/cart-reducer';
import { showAddItemModal } from '../../store/modal-reducer/modal-reducer';
import { Camera } from '../../types/camera';
import RatingStars from '../rating-stars/rating-stars';

type Prop = {
  camera: Camera;
  basketItems?: Camera[];
  isActive?: boolean;
}

export default function Card({camera, basketItems, isActive}: Prop): JSX.Element {
  const dispatch = useAppDispatch();

  const handleModalEscKeydown = (evt: KeyboardEvent) => {
    if (evt.key === ESCAPE_KEY) {
      evt.preventDefault();
      closeModal();
    }
  };

  const openAddItemModalClick = () => {
    dispatch(setItemToBuy(camera));
    dispatch(showAddItemModal(true));
    document.addEventListener('keydown', handleModalEscKeydown);
    document.body.classList.add('scroll-lock');
  };

  const closeModal = () => {
    dispatch(showAddItemModal(false));
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
        {basketItems?.some((item) => item.id === camera.id) ?
          <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AppRoute.Basket}>
            <img src="/img/sprite/icon-basket.svg" width="16" height="16" alt="icon basket" />
            В корзине
          </Link>
          :
          <button onClick={openAddItemModalClick} className="btn btn--purple product-card__btn" type="button">Купить</button>}
        <Link className="btn btn--transparent" to={`/camera/${camera.id}${CameraTabs.Info}`}>Подробнее</Link>
      </div>
    </div>
  );
}
