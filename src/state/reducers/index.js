import { combineReducers } from "redux";
import breakReducer from "./breakReducer";
import counterReducer from "./counterReducer";
import sessionReducer from './sessionReducer'

const reducers = combineReducers({
    breaker : breakReducer,
    session: sessionReducer,
    active: counterReducer
});

export default reducers