import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCamerasAction } from '../../store/api-action';
import { getCameras } from '../../store/camera-reducer/selectors';
import { Camera } from '../../types/camera';
import SearchItem from '../search-item/search-item';

export default function Search(): JSX.Element {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchCameras, setSearchCameras] = useState<Camera[]>([]);
  const [searchText, setSearchText] = useState<string>();

  const cameras = useAppSelector(getCameras);

  useEffect(() => {
    dispatch(fetchCamerasAction());
  }, [dispatch]);

  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.currentTarget.value);
    if(cameras) {
      const text = evt.currentTarget.value.toLowerCase();
      const filteredCameras = cameras.filter((item) => item.name.replace(/ /g,'').toLowerCase().includes(text.replace(/ /g,'')));
      setSearchCameras(filteredCameras);
    }
  };

  const resetSearch = () => {
    setSearchText('');
    if(inputRef.current !== null) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="form-search">
      <form>
        <label>
          <img className="form-search__icon" src="/img/sprite/icon-lens.svg" alt="icon lens" width="16" height="16" aria-hidden="true"/>
          <input ref={inputRef} onChange={handleSearchChange} className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту"/>
        </label>
        {
          searchCameras.length > 0 && searchText &&
          <ul className="form-search__select-list">
            {searchCameras?.map((item) => <SearchItem key={item.id} camera={item} onResetSearch={resetSearch} />)}
          </ul>
        }
      </form>
      {
        searchText &&
          <button onClick={resetSearch} className="form-search__reset" type="reset">
            <img src="/img/sprite/icon-close.svg" alt="icon close" width="10" height="10" aria-hidden="true"/>
            <span className="visually-hidden">Сбросить поиск</span>
          </button>
      }
    </div>
  );
}
