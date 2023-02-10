const AuthService = require('./auth.service');
const logger =require('../../support/logger');
const AuthController = {
  /**
   * Handle logging in user.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */

  // function for login
  login: async (httpRequest) => {
    try {
      const loginData = await AuthService.doLogin(httpRequest.body);
      //response of api call of login function (status code and data)
      return {
        statusCode: 200,
        body: {
          data: loginData
        }
      };
    } catch (error) {
      logger.error('login()' + error);
      throw new BadRequestError(error.message);
    }
  },
  // function to register the user
  register: async (httpRequest) => {
    try {
      const registerdata = await AuthService.doRegister(httpRequest.body);
      //response of api call of register function (status code and data)
      return {
        statusCode: 200,
        body: {
          data: registerdata
        }
      };
    } catch (error) {
      logger.error('register()' + error);
      throw new BadRequestError(error.message);
    }
  }
};

module.exports = AuthController;
