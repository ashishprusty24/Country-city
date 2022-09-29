import {
  GET_DATA_LOADING_COUNTRIES,
  GET_DATA_SUCCESS_COUNTRIES,
} from "./action";

export const countryReducer = (
  store = { countries: [], loading: false },
  action
) => {
  switch (action.type) {
    case GET_DATA_LOADING_COUNTRIES: {
      return {
        ...store,
        loading: true,
      };
    }
    case GET_DATA_SUCCESS_COUNTRIES: {
      return { ...store, loading: false, countries: action.data };
    }
    default:
      return store;
  }
};
