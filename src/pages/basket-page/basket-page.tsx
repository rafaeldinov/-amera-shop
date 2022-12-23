import { FormEvent, useEffect, useRef, useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import BasketItem from '../../components/basket-item/basket-item';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBasketItems, getDiscount, getIsActiveRemoveItemModal, getIsActiveSuccessOrderModal } from '../../store/camera-reducer/selectors';
import { getBasket } from '../../util';
import { setBasketItems } from '../../store/camera-reducer/camera-reducer';
import { sendCouponAction, sendOrderAction } from '../../store/api-action';
import RemoveItemModal from '../../components/remove-item-modal/remove-item-modal';
import { PROMO_CODES } from '../../const';
import SuccessOrderModal from '../../components/success-order-modal/success-order-modal';

export default function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoRef = useRef<HTMLInputElement | null>(null);
  const [validation, setValidation] = useState({
    checkIsValid: false,
    className: '',
  });
  const [amountPayable, setAmountPayable] = useState<number>();
  const [discountValue, setDiscountValue] = useState<number>();

  const discount = useAppSelector(getDiscount);
  const basketItems = useAppSelector(getBasketItems);
  const isActiveRemoveItemModal = useAppSelector(getIsActiveRemoveItemModal);
  const isActiveSuccessOrderModal = useAppSelector(getIsActiveSuccessOrderModal);

  const summaryValue = (basketItems && basketItems.length > 0) ?
    basketItems?.map((item) => item.price * item.quantity).reduce((prev, curr) => prev + curr)
    :
    0;

  const camerasIds = basketItems?.map((item) => item.id);

  useEffect(() => {
    dispatch(setBasketItems(getBasket()));
    setDiscountValue(Math.round(Number(discount) * summaryValue / 100));
    if(discount) {
      let summ = summaryValue - Number(discount) * summaryValue / 100;
      summ = Math.round(summ);
      setAmountPayable(summ);
    }
  }, [dispatch, discount, summaryValue]);

  const handlePromoFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(PROMO_CODES.some((item) => item === promoRef.current?.value) && promoRef.current?.value) {
      setValidation({
        checkIsValid: true,
        className: 'is-valid',
      });
      dispatch(sendCouponAction(promoRef.current?.value));
    }else {
      setValidation({
        checkIsValid: true,
        className: 'is-invalid',
      });
    }
  };

  const handleOrderFormSubmit = () => {
    if(camerasIds && camerasIds.length > 0) {
      dispatch(sendOrderAction({camerasIds, coupon: (promoRef.current?.value) ? promoRef.current.value : null}));
    }
  };

  const handleInputPromoChange = () => setValidation({checkIsValid: false, className: '',});

  return (
    <>
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs pageName='basketPage' />
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <ul className="basket__list">
                {basketItems?.map((item) => <BasketItem key={item.id} item={item} />)}
              </ul>
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                  <div className="basket-form">
                    <form onSubmit={handlePromoFormSubmit} action="#">
                      <div className={validation.checkIsValid && !validation.className ? 'custom-input' : `custom-input ${validation['className']}`}>
                        <label><span className="custom-input__label">Промокод</span>
                          <input onChange={handleInputPromoChange} ref={promoRef} type="text" name="promo" placeholder="Введите промокод" defaultValue='' />
                        </label>
                        {validation['className'] === 'is-invalid' && <p className="custom-input__error">Промокод неверный</p>}
                        {validation['className'] === 'is-valid' && <p className="custom-input__success">Промокод принят!</p>}
                      </div>
                      <button className="btn" type="submit">Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Всего:</span>
                    <span className="basket__summary-value">{summaryValue} ₽</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className="basket__summary-value basket__summary-value--bonus">{discountValue || 0} ₽</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
                    <span className="basket__summary-value basket__summary-value--total">{amountPayable || summaryValue} ₽</span>
                  </p>
                  <button onClick={handleOrderFormSubmit} className="btn btn--purple" type="submit">Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      {isActiveRemoveItemModal && <RemoveItemModal />}
      {isActiveSuccessOrderModal && <SuccessOrderModal />}
    </>
  );
}
