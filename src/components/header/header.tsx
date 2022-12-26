import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getBasketItems } from '../../store/cart-reducer/selectors';
import Search from '../search/search';

export default function Header(): JSX.Element {
  const basketItems = useAppSelector(getBasketItems);
  const basketItemsCount = basketItems?.reduce((prev, curr) => prev + curr.quantity, 0);

  return (
    <header className="header" id="header" data-testid="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Root} aria-label="Переход на главную">
          <img src="/img/sprite/icon-logo.svg" alt="icon logo" width="100" height="36" aria-hidden="true"/>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link className="main-nav__link" to={AppRoute.Root}>Каталог</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Гарантии</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Доставка</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <Search />
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <img src="/img/sprite/icon-basket.svg" alt="icon basket" width="16" height="16" aria-hidden="true"/>
          {basketItems?.length !== 0 && <span className="header__basket-count">{basketItemsCount}</span>}
        </Link>
      </div>
    </header>
  );
}
