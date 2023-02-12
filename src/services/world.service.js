import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class WorldService {
  addCountry(country) {
    return axios
      .post(
        `${API_URL}/countries`,
        country,
        {}
      )
      .then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }

  getCurrentDate() {
    return axios
      .get(
        `${API_URL}/current-date`,
        {}
      )
      .then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }

  getAllCountries() {
    return axios
      .get(
        `${API_URL}/countries`,
        {}
      ).then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }

  getAllCities() {
    return axios
      .get(
        `${API_URL}/cities`,
        {}
      ).then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }

  getNextEvent() {
    return axios
      .get(
        `${API_URL}/events/next`,
        {}
      ).then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }
}

const service = new WorldService();
export default service;
