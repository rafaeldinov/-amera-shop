import FocusTrap from 'focus-trap-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setBasketItems, setIsActiveRemoveItemModal, setRemovableItem } from '../../store/camera-reducer/camera-reducer';
import { getRemovableItem } from '../../store/camera-reducer/selectors';
import { deleteFromBasket, getBasket } from '../../util';
import ModalOverlay from '../modal-overlay/modal-overlay';

export default function RemoveItemModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const item = useAppSelector(getRemovableItem);

  const closeModalClick = () => {
    document.body.classList.remove('scroll-lock');
    dispatch(setIsActiveRemoveItemModal(false));
    dispatch(setRemovableItem(undefined));
  };

  const handleDeleteItemClick = () => {
    if(item) {
      deleteFromBasket(item);
    }
    closeModalClick();
    dispatch(setBasketItems(getBasket()));
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
            <p className="title title--h4">Удалить этот товар?</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source type="image/webp" srcSet={`/${item?.previewImgWebp}, /${item?.previewImgWebp2x}`} />
                  <img src={`/${item?.previewImg}`} srcSet={`/${item?.previewImg2x}`} width="140" height="120" alt={item?.name}/>
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{item?.name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">O78DFGSD832</span>
                  </li>
                  <li className="basket-item__list-item">{item?.type} фотокамера</li>
                  <li className="basket-item__list-item">{item?.level} уровень</li>
                </ul>
              </div>
            </div>
            <div className="modal__buttons">
              <button onClick={handleDeleteItemClick} className="btn btn--purple modal__btn modal__btn--half-width" type="button">Удалить
              </button>
              <Link onClick={closeModalClick} className="btn btn--transparent modal__btn" to="#">Продолжить покупки</Link>
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
