/**
 *
 * @param {Object} TaxProRouter
 * @param {ExpressRouter} TaxProRouter.router
 * @param {Taxprocontroller} TaxProRouter.TaxProController
 * @param {TaxProRouter} TaxProRouter.TaxProRouter
 * @param {makeExpressCallback} TaxProRouter.makeExpressCallback
 * @param {makeValidatorCallback} TaxProRouter.makeValidatorCallback
 * @returns {ExpressRouter}
 */


module.exports = ({ router, TaxProController, makeExpressCallback }) => {
    router.get('/list', makeExpressCallback(TaxProController.list));
  
    return router;
  };