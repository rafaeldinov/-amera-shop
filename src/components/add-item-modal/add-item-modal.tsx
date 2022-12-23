import FocusTrap from 'focus-trap-react';
import { ESCAPE_KEY } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setBasketItems, setIsActiveAddItemModal, setIsActiveSuccessAddItemModal, setItemToBuy } from '../../store/camera-reducer/camera-reducer';
import { getItemToBuy } from '../../store/camera-reducer/selectors';
import { getBasket, saveToBasket } from '../../util';
import ModalOverlay from '../modal-overlay/modal-overlay';

export default function AddItemModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const itemToBuy = useAppSelector(getItemToBuy);

  const handleModalEscKeydown = (evt: KeyboardEvent) => {
    if (evt.key === ESCAPE_KEY) {
      evt.preventDefault();
      closeModalClick();
    }
  };

  const closeModalClick = () => {
    document.body.classList.remove('scroll-lock');
    document.removeEventListener('keydown', handleModalEscKeydown);
    dispatch(setIsActiveAddItemModal(false));
    dispatch(setIsActiveSuccessAddItemModal(false));
  };

  const addItemToBasket = () => {
    if(itemToBuy) {
      saveToBasket(itemToBuy);
    }
    dispatch(setBasketItems(getBasket()));
    dispatch(setItemToBuy(undefined));
    document.addEventListener('keydown', handleModalEscKeydown);
    dispatch(setIsActiveAddItemModal(false));
    dispatch(setIsActiveSuccessAddItemModal(true));
  };

  return (
    <FocusTrap focusTrapOptions={{
      fallbackFocus: '#stars-rate'
    }}
    >
      <div className="modal is-active">
        <div className="modal__wrapper">
          <ModalOverlay />
          <div className="modal__content">
            <p className="title title--h4">Добавить товар в корзину</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source type="image/webp" srcSet={`/${itemToBuy?.previewImgWebp}, /${itemToBuy?.previewImgWebp2x}`} />
                  <img src={`/${itemToBuy?.previewImg}`} srcSet={`/${itemToBuy?.previewImg2x}`} width="280" height="240" alt={itemToBuy?.name}/>
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{itemToBuy?.name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{itemToBuy?.vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{itemToBuy?.level} фотокамера</li>
                  <li className="basket-item__list-item">{itemToBuy?.level} уровень</li>
                </ul>
                <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{itemToBuy?.price} ₽</p>
              </div>
            </div>
            <div className="modal__buttons">
              <button onClick={addItemToBasket} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
                <img src="/img/sprite/icon-add-basket.svg" alt="icon add to basket" width="24" height="16" aria-hidden="true"/>
                Добавить в корзину
              </button>
            </div>
            <button onClick={closeModalClick} className="cross-btn" type="button" aria-label="Закрыть попап">
              <img src="/img/sprite/icon-close.svg" alt="icon close pop-up" width="10" height="10" aria-hidden="true"/>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}
