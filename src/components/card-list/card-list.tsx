import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchPageCamerasAction, fetchCamerasAction } from '../../store/api-action';
import { getPageCameras, getCameras } from '../../store/camera-reducer/selectors';
import Card from '../../components/card/card';
import { getCamerasRangePerPage } from '../../const';


type Props = {
  pageNumber: number;
}
export default function CardList({pageNumber}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const camerasPerPage = useAppSelector(getPageCameras);
  const cameras = useAppSelector(getCameras);

  useEffect(() => {
    dispatch(fetchCamerasAction());
    dispatch(fetchPageCamerasAction(getCamerasRangePerPage(pageNumber, cameras.length)));
  }, [dispatch, pageNumber, cameras.length]);

  return (
    <div className="cards catalog__cards">
      {camerasPerPage?.map((item) => (
        <Card key={item.id} camera={item} />
      ))}
    </div>
  );
}
