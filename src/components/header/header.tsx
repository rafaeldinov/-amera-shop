import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function Header(): JSX.Element {
  return (
    <header className="header" id="header">
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
        <div className="form-search">
          <form>
            <label>
              <img className="form-search__icon" src="/img/sprite/icon-lens.svg" alt="icon lens" width="16" height="16" aria-hidden="true"/>
              <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту"/>
            </label>
            <ul className="form-search__select-list">
              <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 8i</li>
              <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 7i</li>
              <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 6i</li>
              <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 5i</li>
              <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 4i</li>
            </ul>
          </form>
          <button className="form-search__reset" type="reset">
            <img src="/img/sprite/icon-close.svg" alt="icon close" width="10" height="10" aria-hidden="true"/>
            <span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <img src="/img/sprite/icon-basket.svg" alt="icon basket" width="16" height="16" aria-hidden="true"/>
          <span className="header__basket-count">3</span>
        </Link>
      </div>
    </header>
  );
}
