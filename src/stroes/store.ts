import { userInitialState, UserState } from './user.store';
import { orderInitialState, OrderState } from './order.store';

export interface Store {
    user: UserState,
    order: OrderState
}

const store: Store = {
    user: userInitialState,
    order: orderInitialState
};

export default store;
