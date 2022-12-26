import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../const';
import Banner from './banner';
import { Routes, Route } from 'react-router-dom';
import { makeFakePromo } from '../../mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  camera: {
    promoOffer: makeFakePromo(),
  }
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('Component: Banner', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<Banner />}
            />
          </Routes>
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
  });
});
