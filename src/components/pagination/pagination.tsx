import { Link } from 'react-router-dom';
// import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/camera-reducer/selectors';
import { SHOW_ITEMS_PER_PAGE_COUNT } from '../../const';

const getPaginationCount = (pageCount: number) => {
  let count = 0;
  const paginationPages = Array.from(Array(pageCount), () => {
    count++;
    return (
      <li className="pagination__item" key={count}>
        <Link className="pagination__link" to={`/catalog/page_${count}`}>{count}</Link>
      </li>);
  });
  return paginationPages;
};

export default function Pagination(): JSX.Element {
  // const activePaginationPage = useAppSelector(getActivePageCameras);
  const cameras = useAppSelector(getCameras);
  const pagePaginationCount = Math.ceil(cameras.length / SHOW_ITEMS_PER_PAGE_COUNT);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item"><Link className="pagination__link pagination__link--text" to="2">Назад</Link>
        </li>
        {getPaginationCount(pagePaginationCount)}
        <li className="pagination__item"><Link className="pagination__link pagination__link--text" to="2">Далее</Link>
        </li>
      </ul>
    </div>
  );
}
