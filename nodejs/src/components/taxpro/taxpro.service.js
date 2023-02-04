
const db = require('../../db/db.js');
const logger = require('../../support/logger');
const { BadRequestError, NotFoundError } = require('../../utils/api-errors');



const TaxProService = {
    /**
     * Login a user and generate token.
     * @async
     * @method
     * @param {UserDto} requestBody - Request Body
     * @returns {Context} Context object
     * @throws {NotFoundError} When the user is not found.
     */
  
  
    doTaxprolist: async () => {
      try {
        
        var sqlObj = `SELECT * FROM taxprofessionaldata`;
        // making db call for inset user in to user_account table with role table inserion 
        const resultObj = await db.promise(sqlObj)
     
        if (resultObj.length == 0) {
          //
          logger.error("doRegister() Insert failed");
          //
          throw new BadRequestError('Insert failed');
        }
        return {
          resultObj
        };
      } catch (error) {
         logger.error(" dolist() "+error);
      }
      
    }
  };


  module.exports=TaxProService