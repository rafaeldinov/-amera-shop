import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import RemoveItemModal from './remove-item-modal';
import { makeFakeCartItem } from '../../mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({
  modal: {
    isActiveRemoveItemModal: true,
  },
  cart: {
    removableItem: makeFakeCartItem()
  }
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('Component: RemoveItemModal', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <RemoveItemModal />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
  });
});
