import { render, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import { AppRoute, ITEMS_PER_PAGE_COUNT } from '../../const';
import { CAMERAS_COUNT, makeFakeCamera, makeFakeCameras, makeFakePromo, makeFakeReviews, REVIEWS_COUNT, SIMILARS_ITEMS_COUNT } from '../../mock';

const mockStore = configureMockStore();

const fakeCameras = makeFakeCameras(CAMERAS_COUNT);
const fakeCamera = makeFakeCamera();
const fakeSimilarCameras = makeFakeCameras(SIMILARS_ITEMS_COUNT);
const fakePageCameras = makeFakeCameras(ITEMS_PER_PAGE_COUNT);
const fakeReviews = makeFakeReviews(REVIEWS_COUNT);
const fakePromoOffer = makeFakePromo();

const store = mockStore({
  cameras: fakeCameras,
  camera: fakeCamera,
  similarCameras: fakeSimilarCameras,
  pageCameras: fakePageCameras,
  reviews: fakeReviews,
  paginationPage: 1,
  promoOffer: fakePromoOffer,
  isActiveReviewModal: false,
  isActiveSuccessReviewModal: false
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('App Routing', () => {

  it('should render "Root" when user navigate to "/"', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    history.push(AppRoute.Catalog);
    render(fakeApp);

    expect(screen.getByText(/Каталог фото и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "CatalogPage" when user navigate to "/catalog/page_:number"', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    history.push('/catalog/page_1');
    render(fakeApp);


    expect(screen.getByText(/Каталог фото и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "Item" when user navigate to "/Item"', () => {
    const camera = makeFakeCamera();
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    history.push(AppRoute.Item.replace('id', camera.id.toString()));

    render(fakeApp);
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });
  it('should render "Catalog" when user navigate to "/basket"', () => {
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
