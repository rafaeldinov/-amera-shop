import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import AddItemModal from '../add-item-modal/add-item-modal';
import { makeFakeCamera } from '../../mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const fakeCamera = makeFakeCamera();

const store = mockStore({
  cart: {
    isActiveAddItemModal: true,
    itemToBuy: fakeCamera
  },
  modal: {
    isActiveReviewModal: true
  }
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('Component: AddItemModal', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddItemModal />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
  });
});
