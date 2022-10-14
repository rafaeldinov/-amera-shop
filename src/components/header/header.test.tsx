import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import Header from './header';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({});

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByTestId(/header/i)).toBeInTheDocument();
  });
});
