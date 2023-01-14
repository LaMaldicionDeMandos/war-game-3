import axios from 'axios';
import * as _ from 'lodash';
import sessionService from './session.service';

const API_URL = process.env.REACT_APP_API_URL;

const HEADERS = (headers) => _.assign({
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}, headers);

class InvoiceService {
  getPendingInvoices() {
    const accessToken = sessionService.getToken();
    return axios
      .get(
        `${API_URL}/invoices/admin?state=invoiced`,
        { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
      )
      .then(response => response.data)
      .catch(e => Promise.reject(e.response?.data));
  }

  getInvoice(invoiceName) {
    const accessToken = sessionService.getToken();
    return axios
      .get(
        `${API_URL}/invoices/admin/${invoiceName}`,
        { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
      )
      .then(response => response.data)
      .catch(e => Promise.reject(e.response?.data));
  }

  approve(invoiceName) {
    const accessToken = sessionService.getToken();
    return axios
      .post(
        `${API_URL}/invoices/admin/${invoiceName}/validation`,
        {},
        { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
      )
      .then(response => response.data)
      .catch(e => Promise.reject(e.response?.data));
  }

  revoke(invoiceName) {
    const accessToken = sessionService.getToken();
    return axios
      .delete(
        `${API_URL}/invoices/admin/${invoiceName}`,
        { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
      )
      .then(response => response.data)
      .catch(e => Promise.reject(e.response?.data));
  }
}

const service = new InvoiceService();
export default service;
