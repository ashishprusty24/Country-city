import { GET_DATA_LOADING_CITIES, GET_DATA_SUCCESS_CITIES } from "./action";

export const cityReducer = (store = { cities: [], loading: false }, action) => {
  switch (action.type) {
    case GET_DATA_LOADING_CITIES: {
      return { ...store, loading: true };
    }
    case GET_DATA_SUCCESS_CITIES: {
      return {
        ...store,
        loading: false,
        cities: action.data,
      };
    }
    default:
      return store;
  }
};
