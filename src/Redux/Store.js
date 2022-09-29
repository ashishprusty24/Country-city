import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { cityReducer } from "./Cities/reducer";
import { countryReducer } from "./Countries/reducer";

const rootReducer = combineReducers({
    cities: cityReducer,
    countries: countryReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));