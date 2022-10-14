import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import Preloader from './preloader';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({});

describe('Component: Preloader', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Preloader />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
