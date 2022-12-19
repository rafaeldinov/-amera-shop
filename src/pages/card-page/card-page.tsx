import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import RatingStars from '../../components/rating-stars/rating-stars';
import Reviews from '../../components/reviews/reviews';
import ReviewModal from '../../components/review-modal/review-modal';
import SuccessModal from '../../components/success-review-modal/success-review-modal';
import Preloader from '../../components/preloader/preloader';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchCameraAction, fetchSimilarAction } from '../../store/api-action';
import { getCamera, getSimilarCameras, getIsActiveReviewModal, getIsActiveSuccessReviewModal, getIsActiveAddItemModal, getIsActiveSuccessAddItemModal } from '../../store/camera-reducer/selectors';
import { CameraTabs, ESCAPE_KEY } from '../../const';
import SimilarItems from '../../components/similar-items/similar-items';
import AddItemModal from '../../components/add-item-modal/add-item-modal';
import SuccessAddItemModal from '../../components/success-add-item-modal/success-add-item-modal';
import { setItemToBuy, setIsActiveAddItemModal } from '../../store/camera-reducer/camera-reducer';

export default function CardPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const camera = useAppSelector(getCamera);
  const similarCameras = useAppSelector(getSimilarCameras);
  const isActiveReviewModal = useAppSelector(getIsActiveReviewModal);
  const isActiveSuccessReviewModal = useAppSelector(getIsActiveSuccessReviewModal);
  const isActiveAddItem = useAppSelector(getIsActiveAddItemModal);
  const isActiveSuccessAddItem = useAppSelector(getIsActiveSuccessAddItemModal);

  const [activeTab, setActiveTab] = useState<string>(CameraTabs.Info);

  useEffect(() => {
    if(id) {
      dispatch(fetchCameraAction(id));
      dispatch(fetchSimilarAction(id));
    }
    if(!location.hash) {
      navigate(`/camera/${id}${CameraTabs.Info}`);
    }
  }, [dispatch, id, location, navigate]);

  const handleCharacteristicsClick = () => {
    setActiveTab(CameraTabs.Info);
    navigate(`/camera/${id}${CameraTabs.Info}`);
  };

  const handleReviewClick = () => {
    setActiveTab(CameraTabs.Review);
    navigate(`/camera/${id}${CameraTabs.Review}`);
  };

  const handleModalEscKeydown = (evt: KeyboardEvent) => {
    if (evt.key === ESCAPE_KEY) {
      evt.preventDefault();
      closeModal();
    }
  };

  const openAddItemModalClick = () => {
    dispatch(setItemToBuy(camera));
    dispatch(setIsActiveAddItemModal(true));
    document.addEventListener('keydown', handleModalEscKeydown);
    document.body.classList.add('scroll-lock');
  };

  const closeModal = () => {
    dispatch(setIsActiveAddItemModal(false));
    document.body.classList.remove('scroll-lock');
    document.removeEventListener('keydown', handleModalEscKeydown);
  };


  if(!camera) {
    return <Preloader />;
  }

  return (
    <>
      <Header />
      <main>
        <div className="page-content" data-testid="card-page">
          <Breadcrumbs pageName='cardPage' cameraName={camera.name} />
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x}`} />
                    <img src={`/${camera.previewImg}`} srcSet={`/${camera.previewImg2x}`} width="560" height="480" alt={camera.name}/>
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{camera.name}</h1>
                  <div className="rate product__rate">
                    <RatingStars rating={camera.rating} />
                    <p className="visually-hidden">Рейтинг: {camera.rating}</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽</p>
                  <button onClick={openAddItemModalClick} className="btn btn--purple" type="button">
                    <img src={'/img/sprite/icon-add-basket.svg'} width="24" height="16" alt={camera.name} aria-hidden="true"/>
                    Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button onClick={handleCharacteristicsClick} className={(activeTab === CameraTabs.Info) ? 'tabs__control is-active' : 'tabs__control'} type="button">Характеристики</button>
                      <button onClick={handleReviewClick} className={(activeTab === CameraTabs.Review) ? 'tabs__control is-active' : 'tabs__control'} type="button">Описание</button>
                    </div>
                    <div className="tabs__content">
                      <div className={(activeTab === CameraTabs.Info) ? 'tabs__element is-active' : 'tabs__element'}>
                        <ul className="product__tabs-list">
                          <li className="item-list"><span className="item-list__title">Артикул:</span>
                            <p className="item-list__text"> {camera.vendorCode}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{camera.category}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{camera.type}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{camera.level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className={(activeTab === CameraTabs.Review) ? 'tabs__element is-active' : 'tabs__element'}>
                        <div className="product__tabs-text">
                          <p>{camera.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {
            (similarCameras.length > 0) &&
              <div className="page-content__section">
                <SimilarItems similarCameras={similarCameras} />
              </div>
          }
          <div className="page-content__section">
            <Reviews id={id} key={id} />
          </div>
        </div>
        {isActiveReviewModal && <ReviewModal />}
        {isActiveSuccessReviewModal && <SuccessModal />}
      </main>
      <Footer />
      {isActiveAddItem && <AddItemModal />}
      {isActiveSuccessAddItem && <SuccessAddItemModal />}
    </>
  );
}
