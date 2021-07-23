import React from 'react';
import store, { Store } from './store';

const initialValue: [ store: Store, dispatch: React.Dispatch<any> ] = [ store, () => {} ];

const Context = React.createContext(initialValue);

export default Context;
