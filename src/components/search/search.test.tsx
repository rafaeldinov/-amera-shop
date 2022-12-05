import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import { CAMERAS_COUNT, makeFakeCameras } from '../../mock';
import Search from './search';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const fakeCameras = makeFakeCameras(CAMERAS_COUNT);

const store = mockStore({
  camera: {
    cameras: fakeCameras,
  }
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('../../store/camera-reducer/camera-reducer');


describe('Component: Search', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Search />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Поиск по сайту/i)).toBeInTheDocument();
  });
});
