import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import { AppRoute } from '../../const';
import { CAMERAS_COUNT, makeFakeCamera, makeFakeCameras, makeFakeReviews, REVIEWS_COUNT, SIMILARS_ITEMS_COUNT } from '../../mock';

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
  }
});

const history = createMemoryHistory();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('../../store/camera-reducer/camera-reducer');

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('App Routing', () => {
  it('should render "Root" when user navigate to /', () => {
    history.push(AppRoute.Catalog);
    render(fakeApp);

    expect(screen.getAllByText('Каталог').length).toBe(3);
  });

  it('should render "CatalogPage" when user navigate to /catalog/:number', () => {
    history.push('/catalog/1');
    render(fakeApp);

    expect(screen.getAllByText('Каталог').length).toBe(3);
  });

  it('should render "Item" when user navigate to /camera/:id/:tab', () => {
    history.push('/camera/1/review');
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
