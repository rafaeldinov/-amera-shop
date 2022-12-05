import { ESCAPE_KEY } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setIsActiveSuccessReviewModal } from '../../store/camera-reducer/camera-reducer';
import { getIsActiveSuccessReviewModal } from '../../store/camera-reducer/selectors';
import ModalOverlay from '../modal-overlay/modal-overlay';

export default function SuccessModal(): JSX.Element {
  const dispatch = useAppDispatch();

  const isActiveSuccessReviewModal = useAppSelector(getIsActiveSuccessReviewModal);

  const closeSuccessModal = () => {
    dispatch(setIsActiveSuccessReviewModal(false));
    document.body.classList.remove('scroll-lock');
    document.removeEventListener('keydown', handleModalEscKeydown);
  };

  const handleModalEscKeydown = (evt: KeyboardEvent) => {
    if (evt.key === ESCAPE_KEY) {
      evt.preventDefault();
      closeSuccessModal();
    }
  };

  const handleClosePopupClick = () => closeSuccessModal();

  if(isActiveSuccessReviewModal) {
    document.addEventListener('keydown', handleModalEscKeydown);
  }

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <ModalOverlay />
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <img className="modal__icon" src="/img/sprite/icon-review-success.svg" alt="icon success" width="80" height="78" aria-hidden="true"/>
          <div className="modal__buttons">
            <button onClick={handleClosePopupClick} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
              Вернуться к покупкам
            </button>
          </div>
          <button onClick={handleClosePopupClick} className="cross-btn" type="button" aria-label="Закрыть попап">
            <img src="/img/sprite/icon-close.svg" alt="icon close pop-up" width="10" height="10" aria-hidden="true"/>
          </button>
        </div>
      </div>
    </div>
  );
}
