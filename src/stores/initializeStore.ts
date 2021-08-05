import { userInitialState, UserState } from './user.store';
import { orderInitialState, OrderState } from './order.store';
import { testInitialState, TestState } from './test.store';

export interface Store {
  test: TestState;
  user: UserState;
  order: OrderState;
}

const initializeStore: Store = {
  test: testInitialState,
  user: userInitialState,
  order: orderInitialState
};

export default initializeStore;
