import axios from 'axios';
import qs from 'qs';

const baseURL = 'https://api.pexels.com/v1/'

export const curatedData = 'curated';



const api = axios.create({
    method : 'get',
    baseURL : baseURL,

    headers : {
       Accept:"application/json",
        Authorization: "563492ad6f91700001000001b85bae317b784e1bb46b47f5741911f3"
    },
});


export default api;