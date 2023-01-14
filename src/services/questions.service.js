import axios from 'axios';
import * as _ from 'lodash';
import sessionService from './session.service';

const API_URL = process.env.REACT_APP_API_URL;

const HEADERS = (headers) => _.assign({
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}, headers);

class QuestionsService {
  newQuestion(question) {
    const accessToken = sessionService.getToken();
    return axios
      .post(
        `${API_URL}/questions`,
        question,
        { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
      )
      .then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }

  questions() {
    const accessToken = sessionService.getToken();
    return axios
      .get(
        `${API_URL}/questions`,
        { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
      )
      .then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }

  deleteQuestion(question) {
    const accessToken = sessionService.getToken();
    return axios
      .delete(
        `${API_URL}/questions/${question._id}`,
        { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
      )
      .then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }
}

const service = new QuestionsService();
export default service;
