import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute, ITEMS_PER_PAGE_COUNT } from '../../const';
import CardList from './card-list';
import { CAMERAS_COUNT, makeFakeCameras, makeFakeCartItems, MAX_CART_ITEM_COUNT } from '../../mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const fakeCameras = makeFakeCameras(CAMERAS_COUNT);
const fakePageCameras = makeFakeCameras(ITEMS_PER_PAGE_COUNT);

const store = mockStore({
  camera: {
    cameras: fakeCameras,
    filteredCameras: fakeCameras,
    pageCameras: fakePageCameras,
  },
  filtersSorting: {
    filteredCameras: fakeCameras,
  },
  cart: {
    basketItems: makeFakeCartItems(MAX_CART_ITEM_COUNT)
  }
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('Component: CardList', () => {
  it('should render correctly', async() => {
    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardList />
        </HistoryRouter>,
      </Provider>,
    );
    expect(screen.getAllByTestId('div-id').length).toBe(ITEMS_PER_PAGE_COUNT);
  });
});
