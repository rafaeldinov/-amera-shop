import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/camera-reducer/selectors';
import { getPaginagionPageCount } from '../../const';

export default function Pagination(): JSX.Element {
  const params = useParams();
  const cameras = useAppSelector(getCameras);
  const pageCount = getPaginagionPageCount(cameras.length);
  const number = Number(params.number);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {number !== 1 && pageCount ?
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text" to={`/catalog/page_${Number(number) - 1}`}>Назад</Link>
          </li> : ''}
        {
          Array.from(Array(pageCount), (_, index) => (
            <li className="pagination__item" key={index}>
              <Link className={number !== index + 1 ?
                'pagination__link' : 'pagination__link pagination__link--active'} to={`/catalog/page_${index + 1}`}
              >{index + 1}
              </Link>
            </li>)
          )
        }
        {(pageCount !== number && pageCount) ?
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text" to={`/catalog/page_${Number(number) + 1}`}>Далее</Link>
          </li> :
          <div style={{width: '83px', height: '36px', marginLeft:'16px'}} />}
      </ul>
    </div>
  );
}
