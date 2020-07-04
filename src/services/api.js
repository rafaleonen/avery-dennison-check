import axios from 'axios';

const api = axios.create({
    baseURL: 'https://script.google.com/macros/s/AKfycbyCOiNLyfXwRVK-M1Q9GXZXWeh5ZcFLahw_OMrW/exec',

});

export default api;