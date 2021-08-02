import { createContext, Dispatch } from 'react';
import store, { Store } from './store';

const initialValue: [store: Store, dispatch: Dispatch<any>] = [store, () => {}];

const Context = createContext(initialValue);

export default Context;
