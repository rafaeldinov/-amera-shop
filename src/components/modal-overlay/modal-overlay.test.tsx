import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import ModalOverlay from './modal-overlay';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);


const store = mockStore({
  modal: {
    isActiveSuccessReviewModal: true
  },
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('Component: ModalOverlay', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalOverlay />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByTestId(/overlay/i)).toBeInTheDocument();
  });
});
