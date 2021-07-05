// https://redux.js.org/recipes/configuring-your-store

import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import middleware from './middleware';

import rootReducer from './reducers';

export default function configureStore(preloadedState) {
	const middlewares = [middleware, thunk, logger];
	const middlewareEnhancer = applyMiddleware(...middlewares);

	const enhancers = [middlewareEnhancer];
	const composedEnhancers = compose(...enhancers);

	const store = createStore(rootReducer, preloadedState, composedEnhancers);

	return store;
}
