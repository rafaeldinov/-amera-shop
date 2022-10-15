import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import ReviewItem from './review-item';
import { makeFakeReview } from '../../mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({});

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const review = makeFakeReview();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ul>
            <ReviewItem review={review} />
          </ul>
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByTestId('review')).toBeInTheDocument();
  });
});
