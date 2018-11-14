import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import tableReducer from './tableReducer';

const rootReducer = combineReducers({
    reduxFormReducer,
    authentication,
    users,
    tableReducer
});

export default rootReducer;