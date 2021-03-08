
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducers from 'reducers'

const bindMiddleWares = middleWares => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    const { logger } = require(`redux-logger`);
    middleWares.push(logger);

    return composeWithDevTools(applyMiddleware(...middleWares));
  }
  return applyMiddleware(...middleWares);
};

export default createStore(reducers, bindMiddleWares([thunkMiddleware]))