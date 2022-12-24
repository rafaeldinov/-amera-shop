import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import ModalOverlay from './modal-overlay';
// import { makeFakeCameras, CAMERAS_COUNT, makeFakeCamera, SIMILARS_ITEMS_COUNT, makeFakeReviews, REVIEWS_COUNT, makeFakePromo } from '../../mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

// const fakeCameras = makeFakeCameras(CAMERAS_COUNT);
// const fakeCamera = makeFakeCamera();
// const fakeSimilarCameras = makeFakeCameras(SIMILARS_ITEMS_COUNT);
// const fakePageCameras = makeFakeCameras(ITEMS_PER_PAGE_COUNT);
// const fakeReviews = makeFakeReviews(REVIEWS_COUNT);
// const fakePromoOffer = makeFakePromo();

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

jest.mock('../../store/camera-reducer/camera-reducer');

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
