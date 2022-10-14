import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import CatalogPage from './catalog-page';
import { makeFakeCameras, CAMERAS_COUNT} from '../../mock';


const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  cameras: makeFakeCameras(CAMERAS_COUNT),
});

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId(/catalog-page/i)).toBeInTheDocument();
  });
});
