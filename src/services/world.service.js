import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class WorldService {
  addCountry(country) {
    return axios
      .post(
        `${API_URL}/world/countries`,
        country,
        {}
      )
      .then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }

  getCurrentDate() {
    return axios
      .get(
        `${API_URL}/world/current-date`,
        {}
      )
      .then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }
}

const service = new WorldService();
export default service;
