import { Route, Routes } from 'react-router-dom';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import BasketPage from '../../pages/basket-page/basket-page';
import CartPage from '../../pages/cart-page/cart-page';
import PageNotFound from '../../pages/not-found-page/not-found-page';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';

export default function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<CatalogPage />}
        />
        <Route
          path={AppRoute.Item}
          element={<CartPage />}
        />
        <Route
          path={AppRoute.Basket}
          element={<BasketPage />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<PageNotFound />}
        />
      </Routes>
    </HistoryRouter>
  );
}
