import axios from "axios"
import { addToFavourites, fetchFromFavourites, removeFromFavourites } from "../../helpers/db"

const convertWithSeperators = (numb) => {
    return numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const getWorldData = () => async dispatch => {
    var options = {
        method: 'GET',
        url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world',
        headers: {
            'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
            'x-rapidapi-key': '7e4c8a728emshe997bc7b04c32ffp10de0ejsn5ea99e0373c7'
        }
    };

    try {
        const res = (await axios.request(options)).data[0];
        const data = [
            {
                header: 'TOPLAM VAKA',
                content: convertWithSeperators(res.TotalCases),
                color: '#56C691'
            },
            {
                header: 'AKTİF VAKA',
                content: convertWithSeperators(res.ActiveCases),
                color: '#F8FA61'
            },
            {
                header: 'TOPLAM ÖLÜM',
                content: convertWithSeperators(res.TotalDeaths),
                color: '#DD4A48'
            },
            {
                header: 'YENİ VAKA',
                content: convertWithSeperators(res.NewCases),
                color: '#56C691'
            },
            {
                header: 'KRİTİK VAKA',
                content: convertWithSeperators(res.Serious_Critical),
                color: '#F79432'
            },
            {
                header: 'YENİ ÖLÜM',
                content: convertWithSeperators(res.NewDeaths),
                color: '#DD4A48'
            }
        ]
        dispatch({
            type: 'GET_COUNTRIES',
            payload: data
        })
    } catch (error) {
        throw error;
    }
}

export const getContinentData = (code) => async dispatch => {
    dispatch({
        type: 'CLEAR_CONTINENT_COUNTRIES'
    })
    var options = {
        method: 'GET',
        url: `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/${code}`,
        headers: {
            'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
            'x-rapidapi-key': '7e4c8a728emshe997bc7b04c32ffp10de0ejsn5ea99e0373c7'
        }
    };

    try {
        const res = (await axios.request(options)).data;


        dispatch({
            type: 'GET_CONTINENT_COUNTRIES',
            payload: res
        })
    } catch (error) {
        throw error;
    }
}

export const getIndividualCountryData = (countryName, threeLetterSymbol) => async dispatch => {
    dispatch({
        type: 'CLEAR_INDIVIDUAL_COUNTRY'
    })
    var options = {
        method: 'GET',
        url: `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/${countryName}/${threeLetterSymbol}`,
        headers: {
            'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
            'x-rapidapi-key': '7e4c8a728emshe997bc7b04c32ffp10de0ejsn5ea99e0373c7'
        }
    };

    try {
        const res = (await axios.request(options)).data[0];
        const data = [
            {
                header: 'TOPLAM VAKA',
                content: convertWithSeperators(res.TotalCases),
                color: '#56C691'
            },
            {
                header: 'AKTİF VAKA',
                content: convertWithSeperators(res.ActiveCases),
                color: '#F8FA61'
            },
            {
                header: 'TOPLAM ÖLÜM',
                content: convertWithSeperators(res.TotalDeaths),
                color: '#DD4A48'
            },
            {
                header: 'YENİ VAKA',
                content: convertWithSeperators(res.NewCases),
                color: '#56C691'
            },
            {
                header: 'KRİTİK VAKA',
                content: convertWithSeperators(res.Serious_Critical),
                color: '#F79432'
            },
            {
                header: 'YENİ ÖLÜM',
                content: convertWithSeperators(res.NewDeaths),
                color: '#DD4A48'
            }
        ]
        dispatch({
            type: 'GET_INDIVIDUAL_COUNTRY',
            payload: data
        })


    } catch (error) {
        throw error;
    }
}

export const addToFav = (countryName, countryCode) => async dispatch => {
    try {
        const dbResult = await addToFavourites(countryName, countryCode);
        //   dispatch({
        //       type: 'GET_FAVOURITE_COUNTRIES',
        //       payload: dbResult.rows._array
        //   })

    } catch (error) {
        throw error;
    }
}

export const removeFromFav = (countryName, countryCode) => async dispatch => {
    try {
        const dbResult = await removeFromFavourites(countryName, countryCode)

    } catch (error) {
        throw error;
    }
}

export const fetchFavourites = () => async dispatch => {
    try {
        const dbResult = await fetchFromFavourites();

        console.log('ACTIONDAN GELEN LOG')
        console.log(dbResult.rows._array)

        dispatch({
            type: 'GET_FAVOURITE_COUNTRIES',
            payload: dbResult.rows._array
        })

    } catch (error) {
        throw error;
    }
}