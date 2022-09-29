import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchPromoAction } from '../../store/api-action';
import { getPromoOffer } from '../../store/camera-reducer/selectors';

export default function Banner(): JSX.Element {
  const dispatch = useAppDispatch();
  const promo = useAppSelector(getPromoOffer);

  useEffect(() => {
    dispatch(fetchPromoAction());
  }, [dispatch]);

  if(!promo) {
    return <div className="banner" />;
  }

  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`/${promo.previewImgWebp}, /${promo.previewImgWebp2x}`}/>
        <img src={`/${promo.previewImg}`} srcSet={`/${promo.previewImg2x}`} width="1280" height="280" alt="баннер"/>
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{promo.name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={`/camera/${promo.id}`}>Подробнее</Link>
      </p>
    </div>
  );
}
