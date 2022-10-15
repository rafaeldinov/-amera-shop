import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/camera-reducer/selectors';
import { AppRoute, getPaginagionPageCount } from '../../const';

export default function Pagination(): JSX.Element {
  let {page = 1} = useParams();
  const navigate = useNavigate();
  const cameras = useAppSelector(getCameras);
  const pageCount = getPaginagionPageCount(cameras.length);
  page = Number(page);

  if(cameras.some((_, index) => index + 1 > page && index + 1 < page)) {
    navigate(`${AppRoute.NotFound}`);
  }

  return (
    <div className="pagination" data-testid="pagination">
      <ul className="pagination__list">
        {
          page !== 1 && pageCount ?
            <li className="pagination__item">
              <Link className="pagination__link pagination__link--text" to={`/catalog/${Number(page) - 1}`}>
                Назад
              </Link>
            </li> : ''
        }
        {
          Array.from(Array(pageCount), (_, index) => (
            <li className="pagination__item" key={index}>
              <Link className={page !== index + 1 ?
                'pagination__link' : 'pagination__link pagination__link--active'} to={`/catalog/${index + 1}`}
              >{index + 1}
              </Link>
            </li>)
          )
        }
        {
          (pageCount !== page && pageCount) ?
            <li className="pagination__item">
              <Link className="pagination__link pagination__link--text" to={`/catalog/${Number(page) + 1}`}>Далее</Link>
            </li> :
            <div style={{width: '83px', height: '36px', marginLeft:'16px'}} />
        }
      </ul>
    </div>
  );
}
