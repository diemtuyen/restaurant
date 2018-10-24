import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tableReducer from '../reducers/tableReducer';
import { reducer as reduxFormReducer } from 'redux-form';

const store = createStore(
  combineReducers({
    tableRedu: tableReducer,
    form: reduxFormReducer
  }),
  applyMiddleware(
    thunk
  )
);
/*
const reducer = combineReducers({
  tableRedu: tableReducer,
  form: reduxFormReducer,
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);
*/
export default store;