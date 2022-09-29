export let GET_DATA_CITIES = 'GET_DATA_CITIES';
export let GET_DATA_SUCCESS_CITIES = 'GET_DATA_SUCCESS_CITIES';
export let GET_DATA_LOADING_CITIES = 'GET_DATA_LOADING_CITIES';


export const getDataLoadingCities = () => ({
    type: GET_DATA_LOADING_CITIES
});

export const getDataSuccessCities = (data) => ({
    type: GET_DATA_SUCCESS_CITIES,
    data
});

export const getDataCities = () => async(dispatch) => {
    try {
        dispatch(getDataLoadingCities());
        let res = await fetch('https://country-city-app-by-akash.herokuapp.com/cities');
        let data = await res.json();
        dispatch(getDataSuccessCities(data));
    } catch (error) {
        console.log(error);
    }
}

export const sortByPopulation = (order, country) => async(dispatch) => {
    try {
        dispatch(getDataLoadingCities());
        let res = await fetch('https://country-city-app-by-akash.herokuapp.com/cities');
        let data = await res.json();
        if(order === 'asc'){
            data.sort((a, b) => a.population - b.population);
        }
        if(order === 'desc'){
            data.sort((a, b) => b.population - a.population);
        }
        if(country){
            data = data.filter(item => item.country === country);
        }
        dispatch(getDataSuccessCities(data));
    } catch (error) {
        console.log(error);
    }
}

export const filterByCountry = (country) => async(dispatch) => {
    try {
        if(!country){
            dispatch(getDataCities());
            return;
        }
        dispatch(getDataLoadingCities());
        let res = await fetch('https://country-city-app-by-akash.herokuapp.com/cities?country=' + country);
        let data = await res.json();
        
        dispatch(getDataSuccessCities(data));
    } catch (error) {
        console.log(error);
    }
}