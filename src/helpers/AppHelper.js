import moment from 'moment';

class AppHelper {

  static Hello() {
    return 'Hello world';
  }

  /**
   * Get birth date
   *
   * @param {string} date YYYY-mm-dd
   * @param {boolean} format
   * @return {string} mm.dd.YYYY
   */
  static getBirth(date, format = false) {
    return moment(date).format('MM.DD.YYYY').toString();
  }
}

export default AppHelper;
