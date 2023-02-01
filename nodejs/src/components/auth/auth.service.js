const bcrypt = require('bcryptjs');
const { User } = require('../../db/models');
const JwtService = require('./jwt.service');
const db = require('../../db/db.js');
const { BadRequestError, NotFoundError } = require('../../utils/api-errors');

const AuthService = {
  /**
   * Login a user and generate token.
   * @async
   * @method
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} When the user is not found.
   */

  doLogin: async (requestBody) => {
    const { email, password } = requestBody;
    let queryObj = `select * from user_account where email = '${email}' and  password = '${password}';`;
    const resultObj = await db.promise(queryObj);
    if (!resultObj) {
      throw new BadRequestError('Username or Password is invalid!');
    }

    payload = {
      userId: resultObj[0].userId,
      role: 'user',
      email: resultObj[0].email
    };

    const accessToken = await JwtService.generateJWT({
      payload
    });
    return {
      accessToken,
      ...payload
    };
  },
};

module.exports = AuthService;
