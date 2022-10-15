import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute, PageName } from '../../const';
import Breadcrumbs from './breadcrumbs';
import { Routes, Route } from 'react-router-dom';
import { makeFakeCamera } from '../../mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({});

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    const pageName = PageName.CardPage;
    const cameraName = makeFakeCamera().name;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<Breadcrumbs pageName={pageName} cameraName={cameraName}/>}
            />
          </Routes>
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });
});
