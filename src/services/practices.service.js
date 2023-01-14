import axios from 'axios';
import * as _ from 'lodash';
import sessionService from './session.service';

const API_URL = process.env.REACT_APP_API_URL;

const HEADERS = (headers) => _.assign({
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}, headers);

class PracticesService {
  upload(file) {
    const accessToken = sessionService.getToken();
    let formData = new FormData();
    formData.append('file', file);
    return axios
      .post(
        `${API_URL}/practices/upload`,
        formData,
        { headers: HEADERS( {Authorization: `bearer ${accessToken}`, 'Content-Type': 'multipart/form-data'}) }
      )
      .then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }

  cartTypes() {
    const accessToken = sessionService.getToken();
    return axios
      .get(
        `${API_URL}/practices/cartTypes`,
        { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
      )
      .then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }

  categories(filter) {
    filter = filter === 'all' ? undefined : filter;
    const accessToken = sessionService.getToken();
    const filterQuery = filter ? `?${filter}=true` : '';
    return axios
      .get(
        `${API_URL}/practices/categories${filterQuery}`,
        { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
      )
      .then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }

  specialties(category, filter) {
    filter = filter === 'all' ? undefined : filter;
    const filterQuery = filter ? `?${filter}=true` : '';
    const accessToken = sessionService.getToken();
    return axios
        .get(
            `${API_URL}/practices/categories/${category}/specialties${filterQuery}`,
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }

  updatePractice(id, delta) {
    const accessToken = sessionService.getToken();
    return axios
        .patch(
            `${API_URL}/practices/${id}`,
            delta,
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }

  newPractice(practice) {
    const accessToken = sessionService.getToken();
    return axios
        .post(
            `${API_URL}/practices`,
            practice,
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }

  deletePractice(practice) {
    const accessToken = sessionService.getToken();
    return axios
        .delete(
            `${API_URL}/practices/${practice._id}`,
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }

  practices(category, specialty, filter) {
    filter = filter === 'all' ? undefined : filter;
    const filterQuery = filter ? `&${filter}=true` : '';
    const accessToken = sessionService.getToken();
    return axios
        .get(
            `${API_URL}/practices?category=${category}&specialty=${specialty}${filterQuery}`,
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }

  providerApprovedPayments(username, offset = 0) {
    const accessToken = sessionService.getToken();
    return axios
        .get(
            `${API_URL}/practices/order/payment?provider${username}&state=approved&offset=${offset}`,
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }

  providerApprovedPaymentsSummary(username) {
    const accessToken = sessionService.getToken();
    return axios
        .get(
            `${API_URL}/practices/order/payment/summary/admin?provider${username}&state=approved`,
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }

  payAll(provider, transactionId) {
    const accessToken = sessionService.getToken();
    return axios
        .post(
            `${API_URL}/practices/order/payment/all/paid`,
            {provider: provider, transaction_id: transactionId},
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }

  pay(payoutId, transactionId) {
    const accessToken = sessionService.getToken();
    return axios
        .post(
            `${API_URL}/practices/order/payment/${payoutId}/paid`,
            {transaction_id: transactionId},
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  };
}

const service = new PracticesService();
export default service;
