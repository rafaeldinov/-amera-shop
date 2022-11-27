import { ChangeEvent, KeyboardEvent, SyntheticEvent, useState, useEffect, useRef } from 'react';
import { DEFAULT_FILTERS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilteredCamerasAction } from '../../store/api-action';
import { setFilters } from '../../store/camera-reducer/camera-reducer';
import { getCameras, getFilters } from '../../store/camera-reducer/selectors';

export default function Filters(): JSX.Element {
  const dispatch = useAppDispatch();

  const filmRef = useRef<HTMLInputElement | null>(null);
  const snapshotRef = useRef<HTMLInputElement | null>(null);

  const [minPriceValue, setMinPriceValue] = useState('');
  const [maxPriceValue, setMaxPriceValue] = useState('');
  const [isVideoCamera, setIsVideoCamera] = useState(false);

  const filters = useAppSelector(getFilters);
  const cameras = useAppSelector(getCameras);
  const cameraPrices = cameras.map((item) => item.price);
  const minPrice = Math.min(...cameraPrices);
  const maxPrice = Math.max(...cameraPrices);

  useEffect(() => {
    dispatch(fetchFilteredCamerasAction());
  }, [dispatch, filters, minPriceValue, maxPriceValue]);

  const handleMinPriceChange = (evt: ChangeEvent<HTMLInputElement>) => setMinPriceValue(evt.currentTarget.value);
  const handleMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>) => setMaxPriceValue(evt.currentTarget.value);

  const handleMinPriceBlur = () => {
    if(!minPriceValue || Number(minPriceValue) < minPrice || Number(minPriceValue) > maxPrice) {
      setMinPriceValue(minPrice.toString());
      return dispatch(setFilters({...filters, minPrice}));
    }
    if(cameras.some((item) => item.price === Number(minPriceValue))) {
      setMinPriceValue(minPriceValue);
      dispatch(setFilters({...filters, minPrice: minPriceValue}));
    }else {
      const minPrices = [...cameras].filter((item) => item.price < Number(minPriceValue));
      const closestCamera = [...minPrices].reduce((prev, curr) => (Math.abs(curr.price - Number(minPriceValue)) < Math.abs(prev.price - Number(minPriceValue)) ? curr : prev));
      setMinPriceValue(closestCamera.price.toString());
      dispatch(setFilters({...filters, minPrice: closestCamera.price}));
    }
  };

  const handleMaxPriceBlur = () => {
    if(!maxPriceValue || Number(maxPriceValue) > maxPrice || Number(maxPriceValue) < minPrice) {
      setMaxPriceValue(maxPrice.toString());
      return dispatch(setFilters({...filters, maxPrice}));
    }
    if(cameras.some((item) => item.price === Number(maxPriceValue))) {
      setMaxPriceValue(maxPriceValue);
      dispatch(setFilters({...filters, maxPrice: maxPriceValue}));
    }else {
      const maxPrices = [...cameras].filter((item) => item.price > Number(maxPriceValue));
      const closestCamera = [...maxPrices].reduce((prev, curr) => (Math.abs(curr.price - Number(maxPriceValue)) < Math.abs(prev.price - Number(maxPriceValue)) ? curr : prev));
      setMaxPriceValue(closestCamera.price.toString());
      dispatch(setFilters({...filters, maxPrice: closestCamera.price}));
    }
  };

  const handlePriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (/[+-]/.test(evt.key)) {
      evt.preventDefault();
    }
    if (evt.key === 'Enter' && evt.currentTarget.name === 'price') {
      handleMinPriceBlur();
    }
    if (evt.key === 'Enter' && evt.currentTarget.name === 'priceUp') {
      handleMaxPriceBlur();
    }
  };

  const handleCategoryChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if(evt.currentTarget.name === 'photocamera') {
      dispatch(setFilters({
        ...filters,
        category: {...filters?.category, photoCamera: !filters?.category.photoCamera},
      }));
    }
    if(evt.currentTarget.name === 'videocamera') {
      setIsVideoCamera(!isVideoCamera);
      dispatch(setFilters({
        ...filters,
        category: {...filters?.category, videoCamera: !filters?.category.videoCamera},
        type: {
          ...filters?.type,
          film: isVideoCamera && filmRef.current?.checked,
          snapshot: isVideoCamera && snapshotRef.current?.checked,
        },
      }));
    }
  };

  const handleTypeChange = (evt: SyntheticEvent<HTMLFieldSetElement>) => {
    switch((evt.target as HTMLInputElement).name) {
      case 'digital':
        dispatch(setFilters({
          ...filters,
          type: {...filters?.type, digital: !filters?.type.digital},
        }));
        break;
      case 'film':
        dispatch(setFilters({
          ...filters,
          type: {...filters?.type, film: !filters?.type.film},
        }));
        break;
      case 'snapshot':
        dispatch(setFilters({...filters,
          type: {...filters?.type, snapshot: !filters?.type.snapshot},
        }));
        break;
      case 'collection':
        dispatch(setFilters({...filters,
          type: {...filters?.type, collection: !filters?.type.collection},
        }));
        break;
    }
  };

  const handleLevelChange = (evt: SyntheticEvent<HTMLFieldSetElement>) => {
    switch((evt.target as HTMLInputElement).name) {
      case 'zero':
        dispatch(setFilters({
          ...filters,
          level: {...filters?.level, zero: !filters?.level.zero},
        }));
        break;
      case 'non-professional':
        dispatch(setFilters({...filters,
          level: {...filters?.level, amateur: !filters?.level.amateur},
        }));
        break;
      case 'professional':
        dispatch(setFilters({...filters,
          level: {...filters?.level, professional: !filters?.level.professional},
        }));
        break;
    }
  };

  const handleClearFilterClick = () => {
    dispatch(setFilters(DEFAULT_FILTERS));
    setMinPriceValue('');
    setMaxPriceValue('');
    setIsVideoCamera(false);
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  onKeyDown={handlePriceKeyDown}
                  onBlur={handleMinPriceBlur}
                  onChange={handleMinPriceChange}
                  value={minPriceValue} type="number" name="price" min="0" placeholder={(minPrice && minPrice !== Infinity) ? String(minPrice) : 'от'}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  onKeyDown={handlePriceKeyDown}
                  onBlur={handleMaxPriceBlur}
                  onChange={handleMaxPriceChange}
                  value={maxPriceValue} type="number" name="priceUp" min="0" placeholder={(maxPrice && maxPrice !== -Infinity) ? String(maxPrice) : 'до'}
                />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleCategoryChange} type="checkbox" name="photocamera" defaultChecked={filters?.category.photoCamera} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleCategoryChange} type="checkbox" name="videocamera" defaultChecked={filters?.category.videoCamera} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset onChange={handleTypeChange} className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="digital" defaultChecked={filters?.type.digital} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input ref={filmRef} type="checkbox" name="film" defaultChecked={filters?.type.film} disabled={isVideoCamera} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input ref={snapshotRef} type="checkbox" name="snapshot" defaultChecked={filters?.type.snapshot} disabled={isVideoCamera} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="collection" defaultChecked={filters?.type.collection} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset onChange={handleLevelChange} className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="zero" defaultChecked={filters?.level.zero} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="non-professional" defaultChecked={filters?.level.amateur} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="professional" defaultChecked={filters?.level.professional} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button onClick={handleClearFilterClick} className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры</button>
      </form>
    </div>
  );
}
