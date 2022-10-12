import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import CardPage from './card-page';
import { makeFakeCamera, makeFakeCameras, SIMILARS_ITEMS_COUNT } from '../../mock';


const mockStore = configureMockStore();

const store = mockStore({
  'camera': {
    camera: makeFakeCamera(),
    similarCameras: makeFakeCameras(SIMILARS_ITEMS_COUNT),
    pageCameras: [],
    reviews: [],
    isActiveReviewModal: false,
    isActiveSuccessReviewModal: false
  }
});

describe('Component: CardPage', () => {
  it('should render component CardPage when user navigate to "/camera/:id/:tab" url', () => {
    const history = createMemoryHistory();
    history.push('/camera/1/review');
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardPage />
        </HistoryRouter>
      </Provider>
    );
  });
});
