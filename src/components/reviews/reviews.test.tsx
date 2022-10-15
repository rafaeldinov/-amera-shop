import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import Reviews from './reviews';
import { makeFakeReviews, REVIEWS_COUNT } from '../../mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const fakeReviews = makeFakeReviews(REVIEWS_COUNT);

const store = mockStore({
  camera: {
    reviews: fakeReviews,
  }
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('../../store/camera-reducer/camera-reducer');


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
