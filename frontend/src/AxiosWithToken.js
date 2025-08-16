import axios from 'axios';


// getting an  token from sesison storage
let token=sessionStorage.getItem('token');

console.log(token)

export const axiosWithToken=axios.create({
    headers:{ Authorization:`Bearer ${token}`}
})