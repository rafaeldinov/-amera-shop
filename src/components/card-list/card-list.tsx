import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchPageCamerasAction } from '../../store/api-action';
import { getAllCamerasCount, getCurrentPage, getPageCameras } from '../../store/camera-reducer/selectors';
import { getFilteredCameras, getFilters, getSorting } from '../../store/filters-sorting-reducer/selectors';
import { getBasketItems } from '../../store/cart-reducer/selectors';
import Card from '../../components/card/card';
import { AppRoute, ITEMS_PER_PAGE_COUNT } from '../../const';
import { useNavigate } from 'react-router-dom';
import { getQueryFilters, getQuerySort } from '../../util';
import { setCurrentPage } from '../../store/camera-reducer/camera-reducer';

export default function CardList(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const camerasPerPage = useAppSelector(getPageCameras);
  const filteredCameras = useAppSelector(getFilteredCameras);
  const camerasCount = useAppSelector(getAllCamerasCount);
  const page = useAppSelector(getCurrentPage);
  const sorting = useAppSelector(getSorting);
  const filters = useAppSelector(getFilters);
  const basketItems = useAppSelector(getBasketItems);

  useEffect(() => {
    dispatch(fetchPageCamerasAction({start: page * ITEMS_PER_PAGE_COUNT - ITEMS_PER_PAGE_COUNT, end: page * ITEMS_PER_PAGE_COUNT}));
  }, [dispatch, page, sorting, filters, camerasCount]);

  useEffect(() => {
    if(page > Math.ceil(filteredCameras.length / ITEMS_PER_PAGE_COUNT)) {
      dispatch(setCurrentPage(1));
    }
    navigate(`${AppRoute.Catalog}/#page=${page}${getQueryFilters(filters)}${getQuerySort(sorting)}`);
  }, [dispatch, navigate, sorting, filters, page, filteredCameras]);

  return (
    <div className="cards catalog__cards">
      {camerasPerPage?.map((item) => (
        <Card key={item.id} camera={item} basketItems={basketItems ? basketItems : undefined}/>
      ))}
    </div>
  );
}
