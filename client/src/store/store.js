import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tableReducer from '../reducers/tableReducer';
import reportReducer from '../reducers/reportReducer';
import { reducer as reduxFormReducer } from 'redux-form';

const store = createStore(
  combineReducers({
    tableRedu: tableReducer,
    reportRedu: reportReducer,
    form: reduxFormReducer
  }),
  applyMiddleware(
    thunk
  )
);
export default store;