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
    const { Name, email, password} = requestBody;
    // let checkUseremailQuery = `select * from user_account where email = '${email}';`;
    // const checkUseremailResult = await db.promise(checkUseremailQuery);
    // console.log("checkUseremailResult"+JSON.stringify(checkUseremailResult));
    // if (checkUseremailResult.length > 0) {
    //   throw new BadRequestError('email already exists!');
    // } else {
     // let insertQuery = `insert into user_account (Name, email,password) values ('${Name}','${email}','${password}');`;
      let query2 ="INSERT INTO `user_account` ( `Name`, `email`, `password`) VALUES (, '11hhhhtul.at8@gmail.com', '3434343')"
      console.log(query2);

      db.promise(query2)
      .then((result)=>{console.log("result"+ result);})

      // var sql = "SELECT * FROM friends WHERE username='";
      //  sql = result[0];
      //  sql = "';"
      //  return db.promise(sql);
      //  then((result)=>{ console.log(result);}).
      //  catch((err)=>{ console.log(err);});
      // await db.promise(insertQuery);

      // let selectQuery = `select * from user_account where username = '${username}';`;
      // console.log(selectQuery);
      // const selectResult = await db.promise(selectQuery);
      // console.log(selectResult);

      // payload = {
      //   userId: selectResult[0].uid,
      //   role: 'user',
      //   username: selectResult[0].username
      // };
    },
  // }

  doRegister2: async (requestBody) => {
    const { Name, email, password} = requestBody;
    console.log("Doregister2")
    var sql = "SELECT * FROM ?? WHERE ?? = ?";
    var  sql2='INSERT INTO ?? SET ?'
var inserts = ['user_account', 'id', requestBody];
sql = mysql.format(sql, inserts);
console.log("sql result 0",sql2)
    // let query2 ="INSERT INTO `user_account` ( `Name`, `email`, `password`) VALUES ('11hhhhtul.at8@gmail.com', '3434343')";
    // let emailId ="mithunp@gmail.com"
    // let queryObj3 = `select * from user_account where email = '${emailId}'`;
    // db.promise(queryObj3)
      // .then((result) => {
      //   console.log("first result",JSON.stringify(result))
      
      //   let queryObj = `select * from user_account where email = '${emailId}'`;
      //   return db.promise(queryObj);
      // })
      // .then((result) => {
      //   console.log("second result",JSON.stringify(result));

      // })
      // .catch((err) => {
      //   console.log(err);
      // });
  }
};

module.exports = AuthService;
