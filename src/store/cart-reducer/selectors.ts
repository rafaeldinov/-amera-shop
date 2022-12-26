import { State } from '../../types/state';
import { Camera } from '../../types/camera';
import { CartItem } from '../../types/cart-item';

export const getItemToBuy = (state: State): Camera | undefined => state['cart'].itemToBuy;
export const getBasketItems = (state: State): CartItem[] | undefined => state['cart'].basketItems;
export const getDiscount = (state: State): string | undefined => state['cart'].discount;
export const getRemovableItem = (state: State): CartItem | undefined => state['cart'].removableItem;
