import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/camera-reducer/selectors';
import { getPaginagionPageCount } from '../../const';

export default function Pagination(): JSX.Element {
  const {number = 1} = useParams();
  const [currentPage, setCurrentPage] = useState(Number(number));
  const cameras = useAppSelector(getCameras);
  const pageCount = getPaginagionPageCount(cameras.length);

  const handlerDecreasePaginationClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlerInreasePaginationClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {(currentPage !== 1) ?
          <li onClick={handlerDecreasePaginationClick} className="pagination__item">
            <Link className="pagination__link pagination__link--text" to={`/catalog/page_${currentPage - 1}`}>Назад</Link>
          </li> : ''}
        {
          Array.from(Array(pageCount), (_, index) => (
            <li onClick={() => setCurrentPage(index + 1)} className="pagination__item" key={index}>
              <Link className={(currentPage !== index + 1) ?
                'pagination__link' : 'pagination__link pagination__link--active'} to={`/catalog/page_${index + 1}`}
              >{index + 1}
              </Link>
            </li>)
          )
        }
        {(pageCount !== currentPage) ?
          <li onClick={handlerInreasePaginationClick} className="pagination__item">
            <Link className="pagination__link pagination__link--text" to={`/catalog/page_${currentPage + 1}`}>Далее</Link>
          </li> : ''}
      </ul>
    </div>
  );
}
