import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../const';
import Card from './card';
import { makeFakeCamera } from '../../mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const fakeCamera = makeFakeCamera();

const store = mockStore({});

describe('Component: Card', () => {
  it('should render correctly', () => {
    const isActive = true;
    const camera = fakeCamera;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Card camera={camera} isActive={isActive}/>
        </HistoryRouter>,
      </Provider>,
    );
    expect(screen.getByTestId('div-id')).toHaveClass('product-card is-active');
  });
  it('should not render', () => {
    const isActive = false;
    const camera = fakeCamera;
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Card camera={camera} isActive={isActive}/>
        </HistoryRouter>,
      </Provider>,
    );
    expect(screen.getByTestId('div-id')).toHaveClass('product-card');
  });
});
