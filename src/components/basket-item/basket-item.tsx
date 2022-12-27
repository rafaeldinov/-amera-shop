import { ChangeEvent, useEffect, useState } from 'react';
import { ESCAPE_KEY, MAX_QUANTITY, MIN_QUANTITY } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setBasketItems, setRemovableItem } from '../../store/cart-reducer/cart-reducer';
import { setIsActiveRemoveItemModal } from '../../store/modal-reducer/modal-reducer';
import { CartItem } from '../../types/cart-item';
import { getBasket, saveToBasket } from '../../util';

type Props = {
  item: CartItem;
}

export default function BasketItem({item}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number | string>(item.quantity);

  useEffect(() => {
    dispatch(setBasketItems(getBasket()));
  }, [dispatch, quantity]);

  const handleIncreaseQuantityClick = () => {
    if(quantity === MAX_QUANTITY) {
      return;
    }
    setQuantity(Number(quantity) + 1);
    saveToBasket(item, Number(quantity) + 1);
  };

  const handleDecreaseQuantityClick = () => {
    if(quantity <= MIN_QUANTITY) {
      return;
    }
    setQuantity(Number(quantity) - 1);
    saveToBasket(item, Number(quantity) - 1);
  };

  const handleQuantityKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (/[+-]/.test(evt.key)) {
      evt.preventDefault();
    }
  };

  const handleQuantityChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if(Number(evt.currentTarget.value) < MIN_QUANTITY || Number(evt.currentTarget.value) > MAX_QUANTITY) {
      saveToBasket(item, MIN_QUANTITY);
      return setQuantity('');
    }
    setQuantity(Number(evt.currentTarget.value));
    saveToBasket(item, Number(evt.currentTarget.value));
  };

  const handleModalEscKeydown = (evt: KeyboardEvent) => {
    if (evt.key === ESCAPE_KEY) {
      evt.preventDefault();
      closeModalClick();
    }
  };

  const handleQuantityBlur = () => {
    if(quantity === '') {
      saveToBasket(item, MIN_QUANTITY);
      setQuantity(MIN_QUANTITY);
    }
  };

  const closeModalClick = () => {
    document.body.classList.remove('scroll-lock');
    document.removeEventListener('keydown', handleModalEscKeydown);
    dispatch(setIsActiveRemoveItemModal(false));
  };

  const handleDeleteItemClick = () => {
    document.body.classList.add('scroll-lock');
    document.addEventListener('keydown', handleModalEscKeydown);
    dispatch(setIsActiveRemoveItemModal(true));
    dispatch(setRemovableItem(item));
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`/${item.previewImgWebp}, /${item.previewImgWebp2x}`} />
          <img src={`/${item.previewImg}`} srcSet={`/${item.previewImg2x}`} width="140" height="120" alt={item.name}/>
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{item.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span>
            <span className="basket-item__number">{item.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{item.type} фотокамера</li>
          <li className="basket-item__list-item">{item.level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{item.price} ₽</p>
      <div className="quantity">
        <button onClick={handleDecreaseQuantityClick} className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара" disabled={quantity === '' || quantity <= MIN_QUANTITY}>
          <img src="img/sprite/icon-arrow.svg" alt="icon arrow" width="7" height="12" aria-hidden="true"/>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input
          onChange={handleQuantityChange}
          onKeyDown={handleQuantityKeyDown}
          onBlur={handleQuantityBlur}
          type="number" id="counter1" value={quantity} min="1" max="99" aria-label="количество товара"
        />
        <button onClick={handleIncreaseQuantityClick} className="btn-icon btn-icon--next" aria-label="увеличить количество товара" disabled={quantity >= MAX_QUANTITY}>
          <img src="img/sprite/icon-arrow.svg" alt="icon arrow" width="7" height="12" aria-hidden="true" />
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{item.price * item.quantity} ₽</div>
      <button onClick={handleDeleteItemClick} className="cross-btn" type="button" aria-label="Удалить товар">
        <img src="img/sprite/icon-close.svg" alt="icon close" width="10" height="10" aria-hidden="true"/>
      </button>
    </li>
  );
}
