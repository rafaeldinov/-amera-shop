import FocusTrap from 'focus-trap-react';
import { useAppDispatch } from '../../hooks';
import { setIsActiveSuccessOrderModal } from '../../store/modal-reducer/modal-reducer';
import ModalOverlay from '../modal-overlay/modal-overlay';

export default function SuccessOrderModal(): JSX.Element {
  const dispatch = useAppDispatch();

  const closeModalClick = () => {
    document.body.classList.remove('scroll-lock');
    dispatch(setIsActiveSuccessOrderModal(false));
  };

  return (
    <FocusTrap focusTrapOptions={{
      fallbackFocus: '#close-popup'
    }}
    >
      <div className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <ModalOverlay />
          <div className="modal__content">
            <p className="title title--h4">Спасибо за покупку</p>
            <img className="modal__icon" src="/img/sprite/icon-review-success.svg" alt="icon success" width="80" height="78" aria-hidden="true"/>
            <div className="modal__buttons">
              <button onClick={closeModalClick} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">Вернуться к покупкам
              </button>
            </div>
            <button onClick={closeModalClick} className="cross-btn" type="button" aria-label="Закрыть попап" id="close-popup">
              <img src="/img/sprite/icon-close.svg" alt="icon close pop-up" width="10" height="10" aria-hidden="true"/>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}
