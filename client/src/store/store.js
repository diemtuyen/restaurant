import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tableReducer from '../reducers/tableReducer';
import reportReducer from '../reducers/reportReducer';
import authReducer from '../reducers/authReducer';
import { reducer as reduxFormReducer } from 'redux-form';

const store = createStore(
  combineReducers({
    tableRedu: tableReducer,
    reportRedu: reportReducer,
    authRedu: authReducer,
    form: reduxFormReducer
  }),
  applyMiddleware(
    thunk
  )
);
export default store;