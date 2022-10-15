import { render, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute, ITEMS_PER_PAGE_COUNT } from '../../const';
import CardList from './card-list';
import { CAMERAS_COUNT, makeFakeCameras } from '../../mock';

const mockStore = configureMockStore();

const fakeCameras = makeFakeCameras(CAMERAS_COUNT);
const fakePageCameras = makeFakeCameras(ITEMS_PER_PAGE_COUNT);

const store = mockStore({
  cameras: fakeCameras,
  pageCameras: fakePageCameras,
});

describe('Component: CardList', () => {
  it('should render correctly', async() => {
    const history = createMemoryHistory();
    history.push(AppRoute.Root);

    const pageNumber = 1;
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardList pageNumber={pageNumber} />
        </HistoryRouter>,
      </Provider>,
    );
    expect(screen.getByTestId('div-id')).toHaveClass('product-card is-active');
  });
});
