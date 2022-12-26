import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute, PROMO_CODES } from '../../const';
import Basket from './basket-page';
import { makeFakeCameras, CAMERAS_COUNT } from '../../mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Basket);

const fakeCameras = makeFakeCameras(CAMERAS_COUNT);

const store = mockStore({
  camera: {
    cameras: fakeCameras,
  },
  cart: {
    discount: PROMO_CODES[0]
  },
  modal: {
    isActiveRemoveItemModal: false
  },
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('Component: BasketPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Basket />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Скидка/i)).toBeInTheDocument();
  });
});
