import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../const';
import SuccessModal from './success-review-modal';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({
  modal: {
    isActiveSuccessReviewModal: true
  }
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('Component: SuccessModal', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SuccessModal />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
  });
});
