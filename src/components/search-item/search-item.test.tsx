import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import { CAMERAS_COUNT, makeFakeCameras } from '../../mock';
import SearchItem from './search-item';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const fakeCameras = makeFakeCameras(CAMERAS_COUNT);

const store = mockStore({});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('../../store/camera-reducer/camera-reducer');


describe('Component: SearchItem', () => {
  it('should render correctly', () => {
    const resetSearch = () => '';

    const {container} = render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ul className="form-search__select-list">
            {fakeCameras.map((item) => <SearchItem key={item.id} camera={item} onResetSearch={resetSearch} />)}
          </ul>
        </HistoryRouter>,
      </Provider>,
    );

    // expect(container.querySelector('.form-search__select-item')).toBeTruthy();
    // eslint-disable-next-line testing-library/no-container
    // const camerasList = container.getElementsByClassName('form-search__select-item');
    // expect(camerasList.length).toBe(40);
    // eslint-disable-next-line testing-library/no-container
    expect(container.getElementsByClassName('form-search__select-item').length).toBe(40);
  });
});
