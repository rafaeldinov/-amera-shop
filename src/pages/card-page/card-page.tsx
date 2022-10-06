import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import RatingStars from '../../components/rating-stars/rating-stars';
import Card from '../../components/card/card';
import Reviews from '../../components/reviews/reviews';
import ProductReviewModal from '../../components/product-review-modal/product-review-modal';
import SuccessModal from '../../components/success-modal/success-modal';
import Preloader from '../../components/preloader/preloader';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchCameraAction, fetchCamerasAction, fetchSimilarAction } from '../../store/api-action';
import { getCamera, getSimilarCameras, getIsActiveReviewModal, getIsActiveSuccessReviewModal, getCameras } from '../../store/camera-reducer/selectors';
import { AppRoute } from '../../const';

export default function CardPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const {tab = 'review'} = useParams();
  const navigate = useNavigate();
  const cameras = useAppSelector(getCameras);
  const camera = useAppSelector(getCamera);
  const similarCameras = useAppSelector(getSimilarCameras);
  const isActiveReviewModal = useAppSelector(getIsActiveReviewModal);
  const isActiveSuccessReviewModal = useAppSelector(getIsActiveSuccessReviewModal);

  const [startCount, setStartCount] = useState(0);
  const [endCount, setEndCount] = useState(3);
  const [activeTab, setActiveTab] = useState(tab);

  useEffect(() => {
    if(id) {
      dispatch(fetchCamerasAction());
      dispatch(fetchCameraAction(id));
      dispatch(fetchSimilarAction(id));
    }
    if(Number(id) <= 0 || Number(id) > cameras.length) {
      navigate(AppRoute.NotFound);
    }
  }, [dispatch, navigate, id, cameras.length]);

  const handleItemСharacteristicsClick = () => {
    setActiveTab('info');
    navigate(`/camera/${id}/info`);
  };

  const handleItemReviewClick = () => {
    setActiveTab('review');
    navigate(`/camera/${id}/review`);
  };

  const handlePreviousButtonClick = () => {
    if(startCount > 0) {
      setStartCount(startCount - 3);
      setEndCount(endCount - 3);
    }
  };
  const handleNextButtonClick = () => {
    if(endCount < similarCameras.length) {
      setStartCount(startCount + 3);
      setEndCount(endCount + 3);
    }
  };

  if(!camera) {
    return <Preloader />;
  }

  if(tab !== undefined && tab !== 'info' && tab !== 'review') {
    navigate(`${AppRoute.NotFound}`);
  }

  return (
    <>
      <Header />
      <main>
        <div className="page-content">
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
                  <button className="btn btn--purple" type="button">
                    <img src={'/img/sprite/icon-add-basket.svg'} width="24" height="16" alt={camera.name} aria-hidden="true"/>
                    Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button onClick={handleItemСharacteristicsClick} className={(activeTab === 'info') ? 'tabs__control is-active' : 'tabs__control'} type="button">Характеристики</button>
                      <button onClick={handleItemReviewClick} className={(activeTab === 'review') ? 'tabs__control is-active' : 'tabs__control'} type="button">Описание</button>
                    </div>
                    <div className="tabs__content">
                      <div className={(activeTab === 'info') ? 'tabs__element is-active' : 'tabs__element'}>
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
                      <div className={(activeTab === 'review') ? 'tabs__element is-active' : 'tabs__element'}>
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
                <section className="product-similar">
                  <div className="container">
                    <h2 className="title title--h3">Похожие товары</h2>
                    <div className="product-similar__slider">
                      <div className="product-similar__slider-list">
                        {
                          similarCameras.slice(startCount, endCount).map((item) => (
                            <Card key={item.id} camera={item} isActive />
                          ))
                        }
                      </div>
                      <button onClick={handlePreviousButtonClick} className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled={startCount === 0}>
                        <img src="/img/sprite/icon-arrow.svg" alt="icon arrow" width="7" height="12" aria-hidden="true" />
                      </button>
                      <button onClick={handleNextButtonClick} className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" disabled={endCount >= similarCameras.length}>
                        <img src="/img/sprite/icon-arrow.svg" alt="icon arrow" width="7" height="12" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </section>
              </div>
          }
          <div className="page-content__section">
            <Reviews id={id} key={id} />
          </div>
        </div>
        {isActiveReviewModal && <ProductReviewModal />}
        {isActiveSuccessReviewModal && <SuccessModal />}
      </main>
      <Footer />
    </>
  );
}
