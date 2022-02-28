import axios from "axios"

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