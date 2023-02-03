import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class CountryService {
  getCountry(id) {
    return axios
      .get(
        `${API_URL}/countries/${id}`,
        {}
      ).then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }
}

const service = new CountryService();
export default service;
