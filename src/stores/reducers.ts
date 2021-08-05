import { UserActionTypeEnum, userReducer } from './user.store';
import { OrderActionTypeEnum, orderReducer } from './order.store';
import { Store } from './initializeStore';
import { testReducer } from './test.store';

interface ActionBasic {
  payload: {
    [propsName: string]: any;
  };
}

export interface Action extends ActionBasic {
  type: OrderActionTypeEnum | UserActionTypeEnum;
}

const reducers = {
  ...testReducer,
  ...userReducer,
  ...orderReducer
};

export const storeReducer = (state: Store, action: Action) => {
  const reducer = reducers[action.type];
  if (reducer) {
    return reducer(state, action);
  }
  throw new Error('Please check Reducers!');
};
