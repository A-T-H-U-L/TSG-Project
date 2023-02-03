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
    if (resultObj.length == 0) {
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

  doRegister: async (requestBody) => {
    try {
      const { name, email, password } = requestBody;
    var sql = `INSERT INTO user_account VALUES (?,?,?,?)`;
    let fileds = [,name, email, password];
    const resultObj = await db.promise(sql,[,name, email, password])
      .then((result) => {
        console.log('first result1', JSON.stringify(result));
        let queryObj = `select userId from user_account where userId = '${result.insertId}'`;
        return db.promise(queryObj);
      })
      .catch((err) => {
        console.log("catch error ",err);
      });
      console.log("resultObj",resultObj)
      if (resultObj.length == 0) {
        throw new BadRequestError('Insert failed');
      }
      return {
        resultObj
      };
    } catch (error) {
      console.log('doRegister error');
    }
    
  }
};

module.exports = AuthService;
