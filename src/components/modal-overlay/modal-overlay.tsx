import { useAppDispatch, useAppSelector } from '../../hooks';
import { setIsActiveAddItemModal, setIsActiveReviewModal, setIsActiveSuccessAddItemModal, setIsActiveSuccessReviewModal } from '../../store/camera-reducer/camera-reducer';
import { getIsActiveAddItemModal, getIsActiveReviewModal, getIsActiveSuccessAddItemModal, getIsActiveSuccessReviewModal } from '../../store/camera-reducer/selectors';

export default function ModalOverlay(): JSX.Element {
  const dispatch = useAppDispatch();
  const isActiveReviewModal = useAppSelector(getIsActiveReviewModal);
  const isActiveSuccessReviewModal = useAppSelector(getIsActiveSuccessReviewModal);
  const isActiveAddItemModal = useAppSelector(getIsActiveAddItemModal);
  const isActiveSuccessAddItemModal = useAppSelector(getIsActiveSuccessAddItemModal);

  const handleCloseModalClick = () => {
    if(isActiveReviewModal || isActiveSuccessReviewModal || isActiveAddItemModal || isActiveSuccessAddItemModal) {
      dispatch(setIsActiveReviewModal(false));
      dispatch(setIsActiveSuccessReviewModal(false));
      dispatch(setIsActiveAddItemModal(false));
      dispatch(setIsActiveSuccessAddItemModal(false));
      document.body.classList.remove('scroll-lock');
    }
  };

  return (
    <div onClick={handleCloseModalClick} className="modal__overlay" data-testid="overlay" />
  );
}
