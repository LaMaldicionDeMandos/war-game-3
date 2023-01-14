import axios from 'axios';
import * as _ from 'lodash';
import sessionService from './session.service';

const API_URL = process.env.REACT_APP_API_URL;

const HEADERS = (headers) => _.assign({
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}, headers);

class UsersService {
  admins() {
    const accessToken = sessionService.getToken();
    return axios
      .get(
        `${API_URL}/users/admins`,
        { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
      )
      .then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }

  providers() {
    const accessToken = sessionService.getToken();
    return axios
        .get(
            `${API_URL}/users/providers`,
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }

  customers() {
    const accessToken = sessionService.getToken();
    return axios
        .get(
            `${API_URL}/users/customers`,
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }

  customer(username) {
    const accessToken = sessionService.getToken();
    return axios
        .get(
            `${API_URL}/users/customers/${username}`,
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }

  provider(username) {
    const accessToken = sessionService.getToken();
    return axios
        .get(
            `${API_URL}/users/providers/${username}`,
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }

  activeProvider(provider) {
    const accessToken = sessionService.getToken();
    return axios
        .post(
            `${API_URL}/users/providers/authorization/${provider._id}`,
            {},
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }

  deleteProvider(provider) {
    const accessToken = sessionService.getToken();
    return axios
        .delete(
            `${API_URL}/users/providers/${provider._id}`,
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }

  deleteCustomer(customer) {
    const accessToken = sessionService.getToken();
    return axios
        .delete(
            `${API_URL}/users/customers/${customer._id}`,
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }

  newAdmin(admin) {
    const accessToken = sessionService.getToken();
    return axios
        .post(
            `${API_URL}/users/admins`,
            admin,
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }

  deleteAdmin(admin) {
    const accessToken = sessionService.getToken();
    return axios
        .delete(
            `${API_URL}/users/admins/${admin._id}`,
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }
}

const service = new UsersService();
export default service;
