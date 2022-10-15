import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import Reviews from './reviews';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({
  isActiveReviewModal: true
});

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    const id = '1';

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Reviews id={id} />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });
});
