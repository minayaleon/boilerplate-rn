import AppService from './AppService';

class UserService extends AppService {

  me() {
    return this.http.get('/me');
  }

  update(userId, formData) {
    return this.http.patch('/users/' + userId, formData);
  }
}

export default UserService;
