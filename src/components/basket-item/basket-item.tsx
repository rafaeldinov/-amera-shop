import { Camera } from '../../types/camera';

type Props = {
  camera: Camera;
}

export default function BasketItem({camera}: Props): JSX.Element {
  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x}`} />
          <img src={`/${camera.previewImg}`} srcSet={`/${camera.previewImg2x}`} width="140" height="120" alt={camera.name}/>
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{camera.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span>
            <span className="basket-item__number">{camera.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{camera.type} фотокамера</li>
          <li className="basket-item__list-item">{camera.level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽</p>
      <div className="quantity">
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара">
          <img src="img/sprite/icon-arrow.svg" alt="icon arrow" width="7" height="12" aria-hidden="true"/>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="number" id="counter1" defaultValue="1" min="1" max="99" aria-label="количество товара"/>
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара">
          <img src="img/sprite/icon-arrow.svg" alt="icon arrow" width="7" height="12" aria-hidden="true"/>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>37 940 ₽</div>
      <button className="cross-btn" type="button" aria-label="Удалить товар">
        <img src="img/sprite/icon-close.svg" alt="icon close" width="10" height="10" aria-hidden="true"/>
      </button>
    </li>
  );
}
