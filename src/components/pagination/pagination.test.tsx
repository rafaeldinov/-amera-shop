import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute, START_PAGE_COUNT } from '../../const';
import Pagination from './pagination';
import { makeFakeCameras, CAMERAS_COUNT } from '../../mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const fakeCameras = makeFakeCameras(CAMERAS_COUNT);

const store = mockStore({
  camera: {
    cameras: fakeCameras,
    allCamerasCount: CAMERAS_COUNT,
    currentPage: START_PAGE_COUNT,
  }
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('../../store/camera-reducer/camera-reducer');

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Pagination />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByTestId(/pagination/i)).toBeInTheDocument();
  });
});
