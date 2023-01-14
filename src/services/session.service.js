import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';

const API_URL = process.env.REACT_APP_API_URL;
const HEADERS = {
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
};

const HEADERS_F = (headers) => _.assign({
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}, headers);

class SessionService {
  refreshToken = () => {
    const accessToken = this.getToken();
    if (accessToken) {
      const p = axios
        .post(
          `${API_URL}/session/tokenRefresh`,
          {},
          { headers: HEADERS_F( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
      return this.#receiveAccessToken(p).catch(e => Promise.reject(e.response?.data));
    } else return Promise.resolve(false);
  }

  login(username, password) {
    const p = axios
      .post(
        `${API_URL}/login`,
        { user: username, password: password },
        { headers: HEADERS }
      )
      .then(response => response.data);
    return this.#receiveAccessToken(p).catch(e => Promise.reject(e.response.data));
  }

  getUser = () => {
    const user = jwt.decode(this.getToken());
    const today = Date.now();
    return (user && today < user.exp * 1000) ? user : undefined;
  };

  getToken = () => {
    return window.localStorage.getItem("token");
  };

  isGod = () => _.some(this.getUser().roles, role => role === 'GOD');

  #receiveAccessToken = (p) => {
    return p.then(token => {
        const user = jwt.decode(token);
        console.log(`Token info: ${JSON.stringify(user)}`);
        return this.#isAdmin(user) ? token : Promise.reject({message: 'invalid_role'});
      }).then(this.#setToken);
  }

  #setToken = token => {
    window.localStorage.setItem("token", token);
    return token;
  };

  #isAdmin = (user) => {
      return _.some(user.roles, role => role === 'GOD' || role === 'ADMIN');
  };
}

const service = new SessionService();
export default service;
