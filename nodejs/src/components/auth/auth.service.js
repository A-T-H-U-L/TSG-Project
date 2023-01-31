const bcrypt = require('bcryptjs');
const { User } = require('../../db/models');
const JwtService = require('./jwt.service');
const mysql = require("mysql");
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
    const { phone, password } = requestBody;
    // const user = await User.findOne({
    //   where: {
    //     phone
    //   }
    // });
    console.log("aaa")

    const connection = mysql.createConnection({

      host: 'localhost',
      user: 'root',
  
     /* password: 'password',*/
      database: 'taxmanager'
  
  });


  connection.connect((err) => {

    if (err) {

        return console.error('error: ' + err.message);

    }

 

    console.log('Connected to the MySQL server.');

});


    if (!user) {
      throw new NotFoundError('User not found');
    }
    const isValidPass = bcrypt.compareSync(password, user.password);
    if (!isValidPass) {
      throw new BadRequestError('Username or Password is invalid!');
    }

    const payload = {
      userId: user.id,
      role: user.role
    };

    const accessToken = await JwtService.generateJWT({
      payload
    });
    return {
      accessToken,
      ...payload
    };
  }
};

module.exports = AuthService;
