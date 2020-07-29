import {environment} from '../environments';
import axios from 'axios';

class AppService {

  constructor() {
    this.http = axios.create({
      baseURL: environment.apiMain,
    });
  }

  /**
   * setAccessToken.
   * @param {string} accessToken - Setting access token.
   */
  setAccessToken(accessToken) {
    this.http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
  }

  getOptions() {
    return this.http.defaults.headers;
  }
}

export default AppService;
