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
    // db.promise = (sql) => {
    //   return new Promise((resolve, reject) => {
    //     db.query(sql, (err, result) => {
    //       if (err) {
    //         reject(new Error());
    //       } else {
    //         resolve(result);
    //       }
    //     });
    //   });
    // };
    
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
    const { name, email,userTypeId,securityQuesId,ratingId, password} = requestBody;
    let checkUseremailQuery = `select * from user_account where email = '${email}';`;
    const checkUseremailResult = await db.promise(checkUseremailQuery);
    if (checkUseremailResult.length > 0) {
      throw new BadRequestError('Username already exists!');
    } else {
      let insertQuery = `insert into user_account (Name, email, userTypeId,securityQuesId,ratingId,password) values ('${name}','${email}','${userTypeId}','${securityQuesId}','${ratingId},'${password}');`;
      console.log(insertQuery);
      await db.promise(insertQuery);

      let selectQuery = `select * from user_account where username = '${username}';`;
      console.log(selectQuery);
      const selectResult = await db.promise(selectQuery);
      console.log(selectResult);

      payload = {
        userId: selectResult[0].uid,
        role: 'user',
        username: selectResult[0].username
      };
    }
  }
};

module.exports = AuthService;
