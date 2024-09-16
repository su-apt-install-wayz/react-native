import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import cartReducer from './reducer';

const store = createStore(cartReducer);

const AppProvider: React.FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AppProvider;
