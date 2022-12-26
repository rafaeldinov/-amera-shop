import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import CatalogPage from './catalog-page';
import { makeFakeCameras, CAMERAS_COUNT, makeFakeCartItems, MAX_CART_ITEM_COUNT } from '../../mock';
import { PROMO_CODES } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeCameras = makeFakeCameras(CAMERAS_COUNT);

const store = mockStore({
  camera: {
    allCamerasCount: CAMERAS_COUNT,
    cameras: fakeCameras,
  },
  filtersSorting: {
    filteredCamerasLoading: false,
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

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });
});
