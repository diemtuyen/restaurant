import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import tableReducer from './tableReducer';
import loadingReducer from './loading.reducer';
import {bookingReducer} from './booking.reducer';
const rootReducer = combineReducers({
    form:reduxFormReducer,
    loading:loadingReducer,
    authentication,
    //users,
    //tableReducer,
    bookingReducer
});

export default rootReducer;