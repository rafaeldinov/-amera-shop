import FocusTrap from 'focus-trap-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setIsActiveSuccessAddItemModal } from '../../store/camera-reducer/camera-reducer';
import ModalOverlay from '../modal-overlay/modal-overlay';

export default function SuccessAddItemModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const closeModalClick = () => {
    document.body.classList.remove('scroll-lock');
    dispatch(setIsActiveSuccessAddItemModal(false));
  };

  return (
    <FocusTrap focusTrapOptions={{
      fallbackFocus: '#stars-rate'
    }}
    >
      <div className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <ModalOverlay />
          <div className="modal__content">
            <p className="title title--h4">Товар успешно добавлен в корзину</p>
            <img className="modal__icon" src="/img/sprite/icon-success.svg" alt="icon success" width="86" height="80" aria-hidden="true"/>
            <div className="modal__buttons">
              <Link onClick={closeModalClick} className="btn btn--transparent modal__btn" to="#">Продолжить покупки</Link>
              <button onClick={() => {
                closeModalClick();
                navigate(AppRoute.Basket);
              }} className="btn btn--purple modal__btn modal__btn--fit-width"
              >
                Перейти в корзину
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
