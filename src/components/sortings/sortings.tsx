import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setSorting } from '../../store/camera-reducer/camera-reducer';
import { SortingMode } from '../../const';

type Props = {
  page: string | number;
}

export default function Sortings({page}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const priceRef = useRef<HTMLInputElement | null>(null);
  const ratingRef = useRef<HTMLInputElement | null>(null);
  const ascendingRef = useRef<HTMLInputElement | null>(null);
  const descendingRef = useRef<HTMLInputElement | null>(null);

  const handlePriceChange = () => {
    if(ascendingRef.current?.checked) {
      dispatch(setSorting(SortingMode.PriceAscending));
      navigate(`/catalog/${page}/price_asc`);
    }
    if(descendingRef.current?.checked) {
      dispatch(setSorting(SortingMode.PriceDescending));
      navigate(`/catalog/${page}/price_desc`);
    }
  };

  const handleRatingClick = () => {
    if(ascendingRef.current?.checked) {
      dispatch(setSorting(SortingMode.RatingAscending));
      navigate(`/catalog/${page}/rating_asc`);
    }
    if(descendingRef.current?.checked) {
      dispatch(setSorting(SortingMode.RatingDescending));
      navigate(`/catalog/${page}/rating_desc`);
    }
  };

  const handleAscendingClick = () => {
    if(!priceRef.current?.checked && !ratingRef.current?.checked) {
      dispatch(setSorting(SortingMode.PriceAscending));
      navigate(`/catalog/${page}/price_asc`);
    }
    if(priceRef.current?.checked) {
      dispatch(setSorting(SortingMode.PriceAscending));
      navigate(`/catalog/${page}/price_asc`);
    }
    if(ratingRef.current?.checked) {
      dispatch(setSorting(SortingMode.RatingAscending));
      navigate(`/catalog/${page}/rating_asc`);
    }
  };

  const handleDescendingClick = () => {
    if(!priceRef.current?.checked && !ratingRef.current?.checked) {
      dispatch(setSorting(SortingMode.PriceDescending));
      navigate(`/catalog/${page}/price_desc`);
    }
    if(priceRef.current?.checked) {
      dispatch(setSorting(SortingMode.PriceDescending));
      navigate(`/catalog/${page}/price_desc`);
    }
    if(ratingRef.current?.checked) {
      dispatch(setSorting(SortingMode.RatingDescending));
      navigate(`/catalog/${page}/rating_desc`);
    }
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input ref={priceRef} onChange={handlePriceChange} type="radio" id="sortPrice" name="sort" />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input ref={ratingRef} onClick={handleRatingClick} type="radio" id="sortPopular" name="sort" />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input ref={ascendingRef} onClick={handleAscendingClick} type="radio" id="up" name="sort-icon" aria-label="По возрастанию" />
              <label htmlFor="up">
                <img src="/img/sprite/icon-sort.svg" alt="icon sort" width="16" height="14" aria-hidden="true"/>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input ref={descendingRef} onClick={handleDescendingClick} type="radio" id="down" name="sort-icon" aria-label="По убыванию" />
              <label htmlFor="down">
                <img src="/img/sprite/icon-sort.svg" alt="icon sort" width="16" height="14" aria-hidden="true"/>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
