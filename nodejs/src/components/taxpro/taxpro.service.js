
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
  
  //service for listing the taxProfesional
    doTaxprolist: async (httpRequestBody) => {
      try {
        console.log("httpRequestBody",httpRequestBody.taxProId)

        var sqlObj = `SELECT * FROM taxprofessionaldata`;
        // making db call for inset user in to user_account table with role table inserion 
        const resultObj = await db.promise(sqlObj)
     
        if (resultObj.length == 0) {
          //
          logger.error("doTaxprolist() Insert failed");
          //
          throw new BadRequestError('Insert failed');
        }
        return {
          resultObj
        };
      } catch (error) {
         logger.error(" dolist() "+error);
      }
      
    },
    viewDetailTaxPro: async (httpRequest) => {
      console.log("httpRequestId",httpRequest.params.id)
      const userId=httpRequest.params.id
      try {
        console.log("httpRequestBody",httpRequest)

        var sqlObj = `SELECT taxprofessionaldata.taxProId, taxprofessionaldata.taxProName, taxprofessionaldata.consultentType, taxprofessionaldata.ratePerHour ,state.stateName,city.cityName
        FROM taxprofessionaldata
        LEFT JOIN state 
        ON taxprofessionaldata.stateId = state.stateId
        LEFT JOIN city
        ON state.cityId = city.cityId
        WHERE taxprofessionaldata.taxProId = ${userId};`;
        // making db call for inset user in to user_account table with role table inserion 
        const resultObj = await db.promise(sqlObj)
     
        if (resultObj.length == 0) {
          //
          logger.error("viewDetailTaxPro() Insert failed");
          //
          throw new BadRequestError('Insert failed');
        }
        return {
          resultObj
        };
      } catch (error) {
         logger.error(" viewDetailTaxPro() "+error);
      }
      
    },

    addDetails: async (requestBody) => {
      try {
        const ratingId=1
        console.log("requestBody",requestBody)
        const {taxProName,consultentType,ratePerHour,state} = requestBody;
//         let insertQuery = `INSERT INTO taxprofessionaldata (taxProName, consultentType, ratePerHour, stateId) SELECT '${taxProName}', '${consultentType}', '${ratePerHour}', '${stateId}' FROM state WHERE state.stateName = '${state}' AND city.cityName = '${city}';`;
//  let insertQuery1=`INSERT INTO taxprofessionaldata (taxProName, consultentType, ratePerHour, stateId) SELECT '${taxProName}', '${consultentType}', '${ratePerHour}', stateId ,city_Id FROM state WHERE state.stateName = '${state} AND city.cityName = '${city}';`
 let insertQuery=`INSERT INTO taxprofessionaldata (taxProName, consultentType, ratePerHour, stateId) SELECT '${taxProName}', '${consultentType}', '${ratePerHour}', stateId  FROM state WHERE state.stateName = '${state}';`    
        // making db call for inset user in to taxprofessionaldata table with role table inserion 
        const resultObj = await db.promise(insertQuery)
   
        .catch((err) => { 
          // write error into logger file
          console.log("catch error ",err);
        });
  
        if (resultObj.length == 0) {
          //
          logger.error("addDetails() Insert failed");
          //
          throw new BadRequestError('Insert failed');
        }
        return {
          resultObj
        };
      } catch (error) {
         logger.error("addDetails()"+error);
      }
      
    }

  };


  module.exports=TaxProService