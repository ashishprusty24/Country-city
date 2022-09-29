export let GET_DATA_COUNTRIES = 'GET_DATA_COUNTRIES';
export let GET_DATA_SUCCESS_COUNTRIES = 'GET_DATA_SUCCESS_COUNTRIES';
export let GET_DATA_LOADING_COUNTRIES = 'GET_DATA_LOADING_COUNTRIES';


export const getDataLoadingCountries = () => ({
    type: GET_DATA_LOADING_COUNTRIES
});

export const getDataSuccessCountries = (data) => ({
    type: GET_DATA_SUCCESS_COUNTRIES,
    data
});

export const getDataCountries = () => async(dispatch) => {
    try {
        dispatch(getDataLoadingCountries());
        let res = await fetch('https://country-city-app-by-akash.herokuapp.com/countries');
        let data = await res.json();
        dispatch(getDataSuccessCountries(data));
    } catch (error) {
        console.log(error);
    }
}