import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import SuccessOrderModal from './success-order-modal';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({
  modal: {
    isActiveSuccessOrderModal: true,
  }
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('../../store/camera-reducer/camera-reducer');

describe('Component: SuccessOrderModal', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SuccessOrderModal />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText('Спасибо за покупку')).toBeInTheDocument();
  });
});
