import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import SimilarItems from './similar-items';
import { makeFakeCameras, SIMILARS_ITEMS_COUNT } from '../../mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({
  isActiveReviewModal: true
});

describe('Component: SimilarItems', () => {
  it('should render correctly', () => {
    const similarCameras = makeFakeCameras(SIMILARS_ITEMS_COUNT);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarItems similarCameras={similarCameras} />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
  });
});
