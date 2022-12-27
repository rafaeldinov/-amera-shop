import { ChangeEvent, KeyboardEvent, SyntheticEvent, useState, useEffect, useRef } from 'react';
import { CameraCategory, CameraLevel, CameraType, DefaultFiters, ENTER_KEY, InputPriceName } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCamerasAction, fetchFilteredCamerasAction } from '../../store/api-action';
import { setFilters } from '../../store/filters-sorting-reducer/filters-sorting-reducer';
import { getCameras } from '../../store/camera-reducer/selectors';
import { getFilters } from '../../store/filters-sorting-reducer/selectors';

export default function Filters(): JSX.Element {
  const dispatch = useAppDispatch();

  const filmRef = useRef<HTMLInputElement | null>(null);
  const snapshotRef = useRef<HTMLInputElement | null>(null);

  const [minPriceValue, setMinPriceValue] = useState('');
  const [maxPriceValue, setMaxPriceValue] = useState('');
  const [isVideoCamera, setIsVideoCamera] = useState(false);

  const filters = useAppSelector(getFilters);
  const allCameras = useAppSelector(getCameras);
  const cameraPrices = allCameras.map((item) => item.price);
  const orderedMinPrices = [...cameraPrices].sort((a, b) => b - a);
  const orderedMaxPrices = [...cameraPrices].sort((a, b) => a - b);
  const minPrice = Math.min(...cameraPrices);
  const maxPrice = Math.max(...cameraPrices);

  useEffect(() => {
    dispatch(fetchFilteredCamerasAction());
    dispatch(fetchCamerasAction());
  }, [dispatch, minPrice, filters]);

  const handleMinPriceChange = (evt: ChangeEvent<HTMLInputElement>) => setMinPriceValue(evt.currentTarget.value);

  const handleMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>) => setMaxPriceValue(evt.currentTarget.value);

  const handleMinPriceBlur = () => {
    if(allCameras.length === 0) {
      setMinPriceValue('');
      return;
    }
    if(Number(minPriceValue) > maxPrice) {
      dispatch(setFilters({...filters, minPrice: minPrice}));
      return setMinPriceValue(minPrice.toString());
    }
    const closestMinPrice = orderedMinPrices.find((item) => item <= Number(minPriceValue));
    setMinPriceValue((closestMinPrice) ? closestMinPrice.toString() : minPrice.toString());
    dispatch(setFilters({...filters, minPrice: (closestMinPrice) ? closestMinPrice.toString() : undefined}));
  };

  const handleMaxPriceBlur = () => {
    if(allCameras.length === 0) {
      setMaxPriceValue('');
      return;
    }
    if(Number(maxPriceValue) > maxPrice || Number(maxPriceValue) < Number(minPriceValue)) {
      dispatch(setFilters({...filters, maxPrice: maxPrice}));
      return setMaxPriceValue(maxPrice.toString());
    }
    const closestMaxPrice = orderedMaxPrices.find((item) => item >= Number(maxPriceValue));
    setMaxPriceValue((closestMaxPrice) ? closestMaxPrice.toString() : '');
    dispatch(setFilters({...filters, maxPrice: (closestMaxPrice) ? closestMaxPrice.toString() : undefined}));
  };

  const handlePriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (/[+-]/.test(evt.key)) {
      evt.preventDefault();
    }
    if (evt.key === ENTER_KEY && evt.currentTarget.name === InputPriceName.Price) {
      handleMinPriceBlur();
    }
    if (evt.key === ENTER_KEY && evt.currentTarget.name === InputPriceName.PriceUp) {
      handleMaxPriceBlur();
    }
  };

  const handleCategoryChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if(evt.currentTarget.name === CameraCategory.Photocamera) {
      dispatch(setFilters({
        ...filters,
        category: {...filters?.category, photoCamera: !filters?.category.photoCamera},
      }));
    }
    if(evt.currentTarget.name === CameraCategory.Videocamera) {
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
      case CameraType.Digital:
        dispatch(setFilters({
          ...filters,
          type: {...filters?.type, digital: !filters?.type.digital},
        }));
        break;
      case CameraType.Film:
        dispatch(setFilters({
          ...filters,
          type: {...filters?.type, film: !filters?.type.film},
        }));
        break;
      case CameraType.Snapshot:
        dispatch(setFilters({...filters,
          type: {...filters?.type, snapshot: !filters?.type.snapshot},
        }));
        break;
      case CameraType.Collection:
        dispatch(setFilters({...filters,
          type: {...filters?.type, collection: !filters?.type.collection},
        }));
        break;
    }
  };

  const handleLevelChange = (evt: SyntheticEvent<HTMLFieldSetElement>) => {
    switch((evt.target as HTMLInputElement).name) {
      case CameraLevel.Zero:
        dispatch(setFilters({
          ...filters,
          level: {...filters?.level, zero: !filters?.level.zero},
        }));
        break;
      case CameraLevel.NonProfessional:
        dispatch(setFilters({...filters,
          level: {...filters?.level, amateur: !filters?.level.amateur},
        }));
        break;
      case CameraLevel.Professional:
        dispatch(setFilters({...filters,
          level: {...filters?.level, professional: !filters?.level.professional},
        }));
        break;
    }
  };

  const handleClearFilterClick = () => {
    dispatch(setFilters(DefaultFiters));
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
              <input onChange={handleCategoryChange} type="checkbox" name="photocamera" checked={filters?.category.photoCamera} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleCategoryChange} type="checkbox" name="videocamera" checked={filters?.category.videoCamera} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset onChange={handleTypeChange} className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="digital" checked={filters?.type.digital} readOnly />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input ref={filmRef} type="checkbox" name="film" checked={filters?.type.film && !filters?.category.videoCamera} disabled={filters?.category.videoCamera} readOnly />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input ref={snapshotRef} type="checkbox" name="snapshot" checked={filters?.type.snapshot && !filters?.category.videoCamera} disabled={filters?.category.videoCamera} readOnly />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="collection" checked={filters?.type.collection} readOnly />
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
