import AppService from './AppService';

class MeService extends AppService {

  get() {
    return this.http.get('/me');
  }

  update(formData) {
    return this.http.patch('/me', formData);
  }
}

export default MeService;
