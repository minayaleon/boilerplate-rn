import AppService from './AppService';

class AuthService extends AppService {

  signIn(formData) {
    return this.http.post('/auth/sign-in', formData);
  }

  signUp(formData) {
    return this.http.post('/auth/sign-up', formData);
  }

  recoverPassword(formData) {
    return this.http.post('/auth/recover-password', formData);
  }

  resetPassword(formData) {
    return this.http.post('/auth/reset-password', formData);
  }
}

export default AuthService;
