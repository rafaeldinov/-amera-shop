import { useState } from 'react';
import Card from '../../components/card/card';
import { SIMILAR_ITEMS_PER_STEP } from '../../const';
import { Camera } from '../../types/camera';

type Props = {
  similarCameras: Camera[];
}

export default function SimilarItems({similarCameras}: Props): JSX.Element {
  const [startCount, setStartCount] = useState(0);
  const [endCount, setEndCount] = useState(SIMILAR_ITEMS_PER_STEP);

  const handlePreviousButtonClick = () => {
    if(startCount > 0) {
      setStartCount(startCount - SIMILAR_ITEMS_PER_STEP);
      setEndCount(endCount - SIMILAR_ITEMS_PER_STEP);
    }
  };
  const handleNextButtonClick = () => {
    if(endCount < similarCameras.length) {
      setStartCount(startCount + SIMILAR_ITEMS_PER_STEP);
      setEndCount(endCount + SIMILAR_ITEMS_PER_STEP);
    }
  };

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {
              similarCameras.slice(startCount, endCount).map((item) => (
                <Card key={item.id} camera={item} isActive />
              ))
            }
          </div>
          <button onClick={handlePreviousButtonClick} className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled={startCount === 0}>
            <img src="/img/sprite/icon-arrow.svg" alt="icon arrow" width="7" height="12" aria-hidden="true" />
          </button>
          <button onClick={handleNextButtonClick} className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" disabled={endCount >= similarCameras.length}>
            <img src="/img/sprite/icon-arrow.svg" alt="icon arrow" width="7" height="12" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
