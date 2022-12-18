import { ESCAPE_KEY } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setIsActiveSuccessReviewModal } from '../../store/camera-reducer/camera-reducer';
import ModalOverlay from '../modal-overlay/modal-overlay';

export default function SuccessReviewModal(): JSX.Element {
  const dispatch = useAppDispatch();

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

  document.addEventListener('keydown', handleModalEscKeydown);

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <ModalOverlay />
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <img className="modal__icon" src="/img/sprite/icon-review-success.svg" alt="icon success" width="80" height="78" aria-hidden="true"/>
          <div className="modal__buttons">
            <button onClick={() => closeSuccessModal()} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
              Вернуться к покупкам
            </button>
          </div>
          <button onClick={() => closeSuccessModal()} className="cross-btn" type="button" aria-label="Закрыть попап">
            <img src="/img/sprite/icon-close.svg" alt="icon close pop-up" width="10" height="10" aria-hidden="true"/>
          </button>
        </div>
      </div>
    </div>
  );
}
