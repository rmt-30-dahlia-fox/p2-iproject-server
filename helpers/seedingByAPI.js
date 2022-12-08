const axios = require('axios')
const { setDevtoolsHook } = require('vue')

const seed = () => {
    let result;
    const { data } = axios({
        method: 'GET',
        url: 'https://footapi7.p.rapidapi.com/api/team/2672/players',
        headers: {
            'X-RapidAPI-Key': 'cac728165dmsh6972b6acff9e936p10ac85jsn408d4f3bcf48',
            'X-RapidAPI-Host': 'footapi7.p.rapidapi.com'
        }
    })

    return result = data
}