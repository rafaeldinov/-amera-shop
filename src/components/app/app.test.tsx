import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import { CAMERAS_COUNT, makeFakeCamera, makeFakeCameras, makeFakeCartItems, makeFakeReviews, MAX_CART_ITEM_COUNT, REVIEWS_COUNT, SIMILARS_ITEMS_COUNT } from '../../mock';
import { PROMO_CODES, START_PAGE_COUNT } from '../../const';

const mockStore = configureMockStore();

const fakeCameras = makeFakeCameras(CAMERAS_COUNT);
const fakeCamera = makeFakeCamera();
const fakeSimilarCameras = makeFakeCameras(SIMILARS_ITEMS_COUNT);
const fakeReviews = makeFakeReviews(REVIEWS_COUNT);

const store = mockStore({
  camera: {
    cameras: fakeCameras,
    camera: fakeCamera,
    similarCameras: fakeSimilarCameras,
    reviews: fakeReviews,
    allCamerasCount: CAMERAS_COUNT,
    currentPage: START_PAGE_COUNT,
  },
  filtersSorting: {
    filteredCameras: fakeCameras,
  },
  modal: {
    isActiveAddItemModal: false
  },
  cart: {
    basketItems: makeFakeCartItems(MAX_CART_ITEM_COUNT),
    discount: PROMO_CODES[0]
  }
});

const history = createMemoryHistory();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('App Routing', () => {
  it('should render "CatalogPage" when user navigate to /catalog/page', () => {
    history.push('/catalog/#page=1');
    render(fakeApp);

    expect(screen.getAllByText(/фото/i)).toHaveLength(3);
  });

  it('should render "Item" when user navigate to /camera', () => {
    history.push('/camera/1#info');
    render(fakeApp);

    expect(screen.getAllByText('Каталог').length).toBe(3);
  });
  it('should render "Catalog" when user navigate to /basket', () => {
    history.push('/basket');
    render(fakeApp);

    expect(screen.getByText(/скидка/i)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/not-found');
    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Back to main page')).toBeInTheDocument();
  });
});
