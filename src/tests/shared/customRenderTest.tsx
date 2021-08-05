import React, { ComponentType, ReactElement, useReducer } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import Context from '../../stores/context';
import PropTypes from 'prop-types';
import { storeReducer } from '../../stores/reducers';
import initializeStore from '../../stores/initializeStore';

const AllTheProviders: ComponentType = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initializeStore);
  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export { customRender };
