import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import Basket from './basket-page';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Basket);

const store = mockStore({});

describe('Component: BasketPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Basket />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Скидка/i)).toBeInTheDocument();
  });
});
