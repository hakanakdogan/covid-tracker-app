const initialState = {
    worldData: [],
    continentCountries: [],
    singleCountry: [],
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



        default:
            return state;
    }
}