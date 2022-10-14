import { useAppDispatch, useAppSelector } from '../../hooks';
import { setIsActiveReviewModal, setIsActiveSuccessReviewModal } from '../../store/camera-reducer/camera-reducer';
import { getIsActiveReviewModal, getIsActiveSuccessReviewModal } from '../../store/camera-reducer/selectors';

export default function ModalOverlay(): JSX.Element {
  const dispatch = useAppDispatch();
  const isActiveReviewModal = useAppSelector(getIsActiveReviewModal);
  const isActiveSuccessReviewModal = useAppSelector(getIsActiveSuccessReviewModal);
  const handleCloseModalClick = () => {
    if(isActiveReviewModal || isActiveSuccessReviewModal) {
      dispatch(setIsActiveReviewModal(false));
      dispatch(setIsActiveSuccessReviewModal(false));
      document.body.classList.remove('scroll-lock');
    }
  };

  return (
    <div onClick={handleCloseModalClick} className="modal__overlay" data-testid="overlay" />
  );
}
