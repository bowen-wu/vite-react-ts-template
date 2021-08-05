import { Store } from './initializeStore';
import { Action } from './reducers';

export interface OrderState {
  id: string;
  status: string;
}

export enum OrderActionTypeEnum {
  UPDATE_STATUS = 'updateStatus'
}

export const orderInitialState: OrderState = {
  id: '123',
  status: 'online'
};

export const orderReducer = {
  [OrderActionTypeEnum.UPDATE_STATUS]: (state: Store, action: Action) => ({
    ...state,
    order: { ...state.order, status: action.payload.status }
  })
};
