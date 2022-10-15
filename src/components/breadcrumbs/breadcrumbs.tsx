import { Link } from 'react-router-dom';
import { AppRoute, PageName } from '../../const';

type Props = {
  pageName: string;
  cameraName?: string;
}

export default function Breadcrumbs({pageName, cameraName} : Props): JSX.Element {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Root}>Главная
              <img src="/img/sprite/icon-arrow-mini.svg" alt="icon arrow" width="5" height="8" aria-hidden="true"/>
            </Link>
          </li>
          {(pageName === PageName.CatalogPage) &&
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
            </li>}
          {(pageName === PageName.CardPage) &&
          <>
            <li className="breadcrumbs__item">
              <Link className="breadcrumbs__link" to={AppRoute.Root}>Каталог
                <img src="/img/sprite/icon-arrow-mini.svg" alt="icon arrow" width="5" height="8" aria-hidden="true"/>
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">{cameraName}</span>
            </li>
          </>}
          {(pageName === PageName.BasketPage) &&
            <>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Каталог
                  <img src="/img/sprite/icon-arrow-mini.svg" alt="icon arrow" width="5" height="8" aria-hidden="true"/>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
              </li>
            </>}
        </ul>
      </div>
    </div>
  );
}
