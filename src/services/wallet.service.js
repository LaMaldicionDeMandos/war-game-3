import axios from 'axios';
import * as _ from 'lodash';
import sessionService from './session.service';

const API_URL = process.env.REACT_APP_API_URL;

const HEADERS = (headers) => _.assign({
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}, headers);

class WalletService {
  walletDetails(username) {
    const accessToken = sessionService.getToken();
    return axios
      .get(
        `${API_URL}/wallets/${username}/details`,
        { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
      )
      .then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }

  userOperations(username,offset = 0, from, to) {
    const fromQuery = from ? `&from=${from}` : '';
    const toQuery = to ? `&to=${to}` : '';
    const accessToken = sessionService.getToken();
    return axios
        .get(
            `${API_URL}/wallets/${username}/operations?offset=${offset}${fromQuery}${toQuery}`,
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .catch(e => Promise.reject(e.response.data));
  }
}

const service = new WalletService();
export default service;
