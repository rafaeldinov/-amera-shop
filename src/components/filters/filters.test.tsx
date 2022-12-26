import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import Filters from './filters';
import { CAMERAS_COUNT, makeFakeCameras } from '../../mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const fakeCameras = makeFakeCameras(CAMERAS_COUNT);

const store = mockStore({
  camera: {
    cameras: fakeCameras,
  },
  filtersSorting: {
    filteredCameras: fakeCameras,
    filters: {
      category: {
        photoCamera: false,
        videoCamera: false,
      },
      type: {
        digital: false,
        film: false,
        snapshot: false,
        collection: false,
      },
      level: {
        zero: false,
        amateur: false,
        professional: false,
      },
      minPrice: 1000,
      maxPrice: 1,
    },
  },
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('Component: Filters', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Filters />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Сбросить фильтры/i)).toBeInTheDocument();
  });
});
