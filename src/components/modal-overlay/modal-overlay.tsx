import { useAppDispatch, useAppSelector } from '../../hooks';
import { showAddItemModal, setIsActiveRemoveItemModal, setIsActiveReviewModal, setIsActiveSuccessAddItemModal, setIsActiveSuccessOrderModal, setIsActiveSuccessReviewModal } from '../../store/modal-reducer/modal-reducer';
import { getIsActiveAddItemModal, getIsActiveRemoveItemModal, getIsActiveReviewModal, getIsActiveSuccessAddItemModal, getIsActiveSuccessOrderModal, getIsActiveSuccessReviewModal } from '../../store/modal-reducer/selectors';

export default function ModalOverlay(): JSX.Element {
  const dispatch = useAppDispatch();
  const isActiveReviewModal = useAppSelector(getIsActiveReviewModal);
  const isActiveSuccessReviewModal = useAppSelector(getIsActiveSuccessReviewModal);
  const isActiveAddItemModal = useAppSelector(getIsActiveAddItemModal);
  const isActiveSuccessAddItemModal = useAppSelector(getIsActiveSuccessAddItemModal);
  const isActiveRemoveItemModal = useAppSelector(getIsActiveRemoveItemModal);
  const isActiveSuccessOrderModal = useAppSelector(getIsActiveSuccessOrderModal);

  const handleCloseModalClick = () => {
    if(isActiveReviewModal || isActiveSuccessReviewModal || isActiveAddItemModal ||
      isActiveSuccessAddItemModal || isActiveRemoveItemModal || isActiveSuccessOrderModal) {
      dispatch(setIsActiveReviewModal(false));
      dispatch(setIsActiveSuccessReviewModal(false));
      dispatch(showAddItemModal(false));
      dispatch(setIsActiveSuccessAddItemModal(false));
      dispatch(setIsActiveRemoveItemModal(false));
      dispatch(setIsActiveSuccessOrderModal(false));
      document.body.classList.remove('scroll-lock');
    }
  };

  return (
    <div onClick={handleCloseModalClick} className="modal__overlay" data-testid="overlay" />
  );
}
