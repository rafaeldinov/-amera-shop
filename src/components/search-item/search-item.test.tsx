import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import { makeFakeCamera } from '../../mock';
import SearchItem from './search-item';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const fakeCamera = makeFakeCamera();

const store = mockStore({});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('Component: SearchItem', () => {
  it('should render correctly', () => {
    const resetSearch = () => '';

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SearchItem key={fakeCamera.id} camera={fakeCamera} onResetSearch={resetSearch} />)
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
  });
});
