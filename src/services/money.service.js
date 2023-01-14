import axios from 'axios';
import * as _ from 'lodash';
import sessionService from './session.service';

const API_URL = process.env.REACT_APP_API_URL;

const HEADERS = (headers) => _.assign({
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}, headers);

class MoneyService {
  summary() {
    const accessToken = sessionService.getToken();
    return axios
      .get(
        `${API_URL}/money/summary`,
        { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
      )
      .then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }
}

const service = new MoneyService();
export default service;
