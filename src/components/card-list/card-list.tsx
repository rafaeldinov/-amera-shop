import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeActivePaginationPage } from '../../store/camera-reducer/camera-reducer';
import { getActivePageCameras } from '../../store/camera-reducer/selectors';
import Card from '../../components/card/card';

export default function CardList(): JSX.Element {
  const dispatch = useAppDispatch();
  const {number} = useParams();
  const camerasPerPage = useAppSelector(getActivePageCameras);

  useEffect(() => {
    if(number) {
      dispatch(changeActivePaginationPage(number));
    }
  }, [dispatch, number]);

  return (
    <div className="cards catalog__cards">
      {camerasPerPage.map((item) => (
        <Card key={item.id} camera={item} />
      ))}
    </div>
  );
}
