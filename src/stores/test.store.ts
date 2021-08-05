/**
 * 此 initializeStore 仅用于测试
 */
import { Store } from './initializeStore';
import { Action } from './reducers';

export interface TestState {
  content: string;
}

export enum TestActionTypeEnum {
  MODIFY_TEST_STATE_CONTENT = 'modifyTestStateContent'
}

export const testInitialState: TestState = {
  content: 'This is Test initializeStore Content'
};

export const testReducer = {
  [TestActionTypeEnum.MODIFY_TEST_STATE_CONTENT]: (state: Store, action: Action) => ({
    ...state,
    test: { ...state.test, content: action.payload }
  })
};
