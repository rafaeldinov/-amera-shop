import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchPromoAction } from '../../store/api-action';
import { getPromoOffer } from '../../store/camera-reducer/selectors';
import { CameraTabs } from '../../const';

export default function Banner(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoCameras = useAppSelector(getPromoOffer);
  const promoCamera = (promoCameras) ? promoCameras[0] : undefined;

  useEffect(() => {
    dispatch(fetchPromoAction());
  }, [dispatch]);

  if(!promoCamera) {
    return <div className="banner" />;
  }

  return (
    <div className="banner">
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{promoCamera.name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={`/camera/${promoCamera.id}${CameraTabs.Info}`}>Подробнее</Link>
      </p>
    </div>
  );
}
