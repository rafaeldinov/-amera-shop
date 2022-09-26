import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type Props = {
  pageName: string;
}

export default function Breadcrumbs({pageName} : Props): JSX.Element {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Root}>Главная
              <img src="/img/sprite/icon-arrow-mini.svg" alt="icon arrow" width="5" height="8" aria-hidden="true"/>
            </Link>
          </li>
          {(pageName === 'catalogPage') &&
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
            </li>}
          {(pageName === 'basketPage') &&
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
