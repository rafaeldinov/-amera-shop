import { render, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import CardPage from './card-page';
import { makeFakeCamera, makeFakeCameras, SIMILARS_ITEMS_COUNT } from '../../mock';


const mockStore = configureMockStore();

const store = mockStore({
  camera: makeFakeCamera(),
  similarCameras: makeFakeCameras(SIMILARS_ITEMS_COUNT),
  pageCameras: [],
  reviews: [],
  isActiveReviewModal: false,
  isActiveSuccessReviewModal: false
});

describe('Component: CardPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId(/card-page/i)).toBeInTheDocument();
  });
});
