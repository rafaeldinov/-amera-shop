import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import Sortings from './sortings';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({});

describe('Component: Sortings', () => {
  it('should render correctly', () => {
    const page = 1;
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Sortings page={page} />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
  });
});
