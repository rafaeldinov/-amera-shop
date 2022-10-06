import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__info">
          <Link className="header__logo" to={AppRoute.Root} aria-label="Переход на главную">
            <img src="/img/sprite/icon-logo.svg" alt="icon logo" width="100" height="36" aria-hidden="true"/>
          </Link>
          <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
          <ul className="social">
            <li className="social__item">
              <Link className="link" to="#" aria-label="Переход на страницу вконтатке">
                <img src="/img/sprite/icon-vk.svg" alt="icon vkontakte" width="20" height="20" aria-hidden="true"/>
              </Link>
            </li>
            <li className="social__item">
              <Link className="link" to="#" aria-label="Переход на страницу pinterest">
                <img src="/img/sprite/icon-pinterest.svg" alt="icon pinterest" width="20" height="20" aria-hidden="true"/>
              </Link>
            </li>
            <li className="social__item">
              <Link className="link" to="#" aria-label="Переход на страницу reddit">
                <img src="/img/sprite/icon-reddit.svg" alt="icon reddit" width="20" height="20" aria-hidden="true"/>
              </Link>
            </li>
          </ul>
        </div>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <p className="footer__title">Навигация</p>
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="link" to="#">Каталог</Link>
              </li>
              <li className="footer__item">
                <Link className="link" to="#">Гарантии</Link>
              </li>
              <li className="footer__item">
                <Link className="link" to="#">Доставка</Link>
              </li>
              <li className="footer__item">
                <Link className="link" to="#">О компании</Link>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Ресурсы</p>
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="link" to="#">Курсы операторов</Link>
              </li>
              <li className="footer__item">
                <Link className="link" to="#">Блог</Link>
              </li>
              <li className="footer__item">
                <Link className="link" to="#">Сообщество</Link>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Поддержка</p>
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="link" to="#">FAQ</Link>
              </li>
              <li className="footer__item">
                <Link className="link" to="#">Задать вопрос</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
}
