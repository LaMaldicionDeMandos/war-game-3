import axios from 'axios';
import * as _ from 'lodash';
import sessionService from './session.service';

const API_URL = process.env.REACT_APP_API_URL;

const HEADERS = (headers) => _.assign({
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}, headers);

class VariablesService {
  updateCreditQuote(quote) {
    const accessToken = sessionService.getToken();
    return axios
      .put(
        `${API_URL}/vars/creditQuote`,
        {value: quote},
        { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
      )
      .then(response => response.data.value)
      .catch(e => Promise.reject(e.response.data));
  }

  updateFee(fee) {
    const accessToken = sessionService.getToken();
    return axios
      .put(
        `${API_URL}/vars/providerFeeFactor`,
        {value: fee},
        { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
      )
      .then(response => response.data.value)
      .catch(e => Promise.reject(e.response.data));
  }

  creditQuote() {
    const accessToken = sessionService.getToken();
    return axios
      .get(
        `${API_URL}/vars/creditQuote`,
        { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
      )
      .then(response => response.data.value)
      .catch(e => Promise.reject(e.response.data));
  }

  fee() {
    const accessToken = sessionService.getToken();
    return axios
      .get(
        `${API_URL}/vars/providerFeeFactor`,
        { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
      )
      .then(response => response.data.value)
      .catch(e => Promise.reject(e.response.data));
  }
}

const service = new VariablesService();
export default service;
