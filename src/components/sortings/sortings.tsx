import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { setSorting } from '../../store/filters-sorting-reducer/filters-sorting-reducer';
import { SortOrder, SortType } from '../../const';

export default function Sortings(): JSX.Element {
  const dispatch = useAppDispatch();
  const [sortType, setSortType] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');

  const handleSortByPriceClick = () => {
    setSortType(SortType.Price);
  };

  const handleSortByRatingClick = () => {
    setSortType(SortType.Rate);
  };

  const handleAscendingSortClick = () => {
    if (!sortType) {
      setSortType(SortType.Price);
      setSortOrder(SortOrder.Asc);
    } else {
      setSortOrder(SortOrder.Asc);
    }
  };

  const handleDescendingSortClick = () => {
    if (!sortType) {
      setSortType(SortType.Price);
      setSortOrder(SortOrder.Desc);
    } else {
      setSortOrder(SortOrder.Desc);
    }
  };

  useEffect(() => {
    dispatch(setSorting({sortType, sortOrder}));
  }, [sortType, sortOrder, dispatch]);

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input onChange={handleSortByPriceClick} type="radio" id="sortPrice" name="sort" defaultChecked={sortType === SortType.Price} />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input onClick={handleSortByRatingClick} type="radio" id="sortPopular" name="sort" defaultChecked={sortType === SortType.Rate} />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input onClick={handleAscendingSortClick} type="radio" id="up" name="sort-icon" aria-label="По возрастанию" defaultChecked={sortOrder === SortOrder.Asc} />
              <label htmlFor="up">
                <img src="/img/sprite/icon-sort.svg" alt="icon sort" width="16" height="14" aria-hidden="true"/>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input onClick={handleDescendingSortClick} type="radio" id="down" name="sort-icon" aria-label="По убыванию" defaultChecked={sortOrder === SortOrder.Desc} />
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
