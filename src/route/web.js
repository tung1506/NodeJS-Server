import express from 'express';
import userController from '../controllers/userController';
import managerController from '../controllers/managerController';
import householdController from '../controllers/householdController';
import authMiddleware from '../middlewares/authMiddleware'

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/api/get-all-user', userController.getAllUser);
    router.get('/api/get-user-by-ID', userController.getUserByID);
    router.post('/api/create-new-user', userController.createNewUser); // tao moi account
    router.post('/api/edit-user-profile', userController.editProfile);
    router.delete('/api/delete-user-by-ID', userController.deleteUserByID) // Chuc nang khai tu (nguoi dung khong the tu khai tu ho)
    router.post('/api/login', userController.handleLoging);
    router.get('/api/get-all-fee', managerController.getFee);
    router.post('/api/create-fee-for-manager', managerController.createFee);
    router.post('/api/create-contribution-for-manager', managerController.createContribution);
    router.post('/api/fee-payments', managerController.createFeePayment);

    router.get('/api/get-all-households', authMiddleware, householdController.getAllHousehold); // test authMiddleware
    router.get('/api/get-all-feePayment', managerController.getAllFeePayment);

    return app.use("/", router);
}

module.exports = initWebRoutes;