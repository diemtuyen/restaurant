import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tableReducer from '../reducers/tableReducer';
import authReducer from '../reducers/authReducer';
import { reducer as reduxFormReducer } from 'redux-form';

/*const store = createStore(
  combineReducers({
    tableRedu: tableReducer,
    authRedu: authReducer
  }),
  applyMiddleware(
    thunk
  )
)(reducer);
*/
const reducer = combineReducers({
  tableRedu: tableReducer,
  authRedu: authReducer,
  form: reduxFormReducer,
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

export default store;