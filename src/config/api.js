import axios from 'axios';

const skemiAPI = axios.create({
   baseURL: 'http://localhost:3000'
})

export default skemiAPI;