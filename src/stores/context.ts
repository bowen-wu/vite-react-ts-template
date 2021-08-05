import { createContext, Dispatch } from 'react';
import initializeStore, { Store } from './initializeStore';

const initialDispatch = () => {};

const initialValue: [store: Store, dispatch: Dispatch<any>] = [initializeStore, initialDispatch];

const Context = createContext(initialValue);

export default Context;
