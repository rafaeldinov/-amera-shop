import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllCamerasCount, getCurrentPage } from '../../store/camera-reducer/selectors';
import { ITEMS_PER_PAGE_COUNT } from '../../const';
import { setCurrentPage } from '../../store/camera-reducer/camera-reducer';

export default function Pagination(): JSX.Element {
  const dispatch = useAppDispatch();
  const camerasCount = useAppSelector(getAllCamerasCount);
  const pageCount = Math.ceil(camerasCount / ITEMS_PER_PAGE_COUNT);
  const currentPage = useAppSelector(getCurrentPage);

  const handlePageClick = (page: number) => dispatch(setCurrentPage(page));

  return (
    <div className="pagination" data-testid="pagination">
      <ul className="pagination__list">
        {
          currentPage !== 1 && pageCount ?
            <li className="pagination__item">
              <Link onClick={() => handlePageClick(currentPage - 1)} className="pagination__link pagination__link--text" to={'#'}>
                Назад
              </Link>
            </li> : ''
        }
        {
          Array.from(Array(pageCount), (_, index) => (
            <li className="pagination__item" key={index}>
              <Link onClick={() => handlePageClick(index + 1)} className={currentPage !== index + 1 ?
                'pagination__link' : 'pagination__link pagination__link--active'} to={'#'}
              >{index + 1}
              </Link>
            </li>)
          )
        }
        {
          (pageCount !== currentPage && pageCount) ?
            <li className="pagination__item">
              <Link onClick={() => handlePageClick(currentPage + 1)} className="pagination__link pagination__link--text" to={'#'}>Далее</Link>
            </li> :
            <div style={{width: '83px', height: '36px', marginLeft:'16px'}} />
        }
      </ul>
    </div>
  );
}
