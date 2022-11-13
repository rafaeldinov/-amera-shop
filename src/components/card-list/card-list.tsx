import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchPageCamerasAction } from '../../store/api-action';
import { getAllCamerasCount, getCurrentPage, getFilters, getPageCameras, getSorting } from '../../store/camera-reducer/selectors';
import Card from '../../components/card/card';
import { AppRoute, ITEMS_PER_PAGE_COUNT } from '../../const';
import { useNavigate } from 'react-router-dom';
import { getQueryFilters, getQuerySort } from '../../util';

export default function CardList(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const camerasPerPage = useAppSelector(getPageCameras);
  const camerasCount = useAppSelector(getAllCamerasCount);
  const page = useAppSelector(getCurrentPage);
  const sorting = useAppSelector(getSorting);
  const filters = useAppSelector(getFilters);

  useEffect(() => {
    dispatch(fetchPageCamerasAction({start: page * ITEMS_PER_PAGE_COUNT - ITEMS_PER_PAGE_COUNT, end: page * ITEMS_PER_PAGE_COUNT}));
  }, [dispatch, page, sorting, filters, camerasCount]);

  useEffect(() => {
    navigate(`${AppRoute.Catalog}/#page=${page}${getQueryFilters(filters)}${getQuerySort(sorting)}`);
  }, [navigate, sorting, filters, page]);

  return (
    <div className="cards catalog__cards">
      {camerasPerPage?.map((item) => (
        <Card key={item.id} camera={item} />
      ))}
    </div>
  );
}
