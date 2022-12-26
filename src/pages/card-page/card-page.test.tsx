import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import CardPage from './card-page';
import { makeFakeCamera, makeFakeCameras, makeFakeCartItem, makeFakeCartItems, makeFakeReviews, MAX_CART_ITEM_COUNT, REVIEWS_COUNT, SIMILARS_ITEMS_COUNT } from '../../mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeCamera = makeFakeCamera();
const fakeSimilarCameras = makeFakeCameras(SIMILARS_ITEMS_COUNT);
const fakeReviews = makeFakeReviews(REVIEWS_COUNT);

const store = mockStore({
  camera: {
    camera: fakeCamera,
    similarCameras: fakeSimilarCameras,
    reviews: fakeReviews,
  },
  modal: {
    isActiveReviewModal: false
  },
  cart: {
    basketItems: makeFakeCartItems(MAX_CART_ITEM_COUNT),
    removableItem: makeFakeCartItem()
  }
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('../../store/camera-reducer/camera-reducer');

describe('Component: CardPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId(/card-page/i)).toBeInTheDocument();
  });
});
