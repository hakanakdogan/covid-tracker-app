const initialState = {
    worldData: [],
    continentCountries: [],
    singleCountry: [],
    favouriteCountries: [],
    loading: true

}


export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'GET_COUNTRIES':
            return {
                ...state,
                worldData: payload,
                loading: false
            }

        case 'GET_CONTINENT_COUNTRIES':
            return {
                ...state,
                continentCountries: payload,
                loading: false
            }
        case 'CLEAR_CONTINENT_COUNTRIES':
            return {
                ...state,
                continentCountries: [],

            }
        case 'GET_INDIVIDUAL_COUNTRY':
            return {
                ...state,
                singleCountry: payload,
                loading: false
            }
        case 'CLEAR_INDIVIDUAL_COUNTRY': {
            return {
                ...state,
                singleCountry: [],
                loading: true
            }
        }
        case 'GET_FAVOURITE_COUNTRIES':

            return {
                ...state,
                favouriteCountries: payload,
                loading: false
            }


        default:
            return state;
    }
}