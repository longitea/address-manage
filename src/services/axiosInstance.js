import axios from 'axios';
import { BASE_URL } from '../constants/API_URL';


// Tạo một instance Axios mới
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    "Content-Type": "application/x-www-form-urlencoded"
    // Authorization: `Bearer ${loginToken}`,
  }
});

export default instance;


