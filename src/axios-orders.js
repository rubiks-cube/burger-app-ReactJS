import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-3393.firebaseio.com/'
});

export default instance;