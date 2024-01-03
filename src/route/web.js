import express from 'express';
import userController from '../controllers/userController';
import managerController from '../controllers/managerController';
import householdController from '../controllers/householdController';
import {authMiddleware,decodeJWT} from '../middlewares/authMiddleware';

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/api/get-all-user', authMiddleware, userController.getAllUser); // lấy full danh sách user
    
    router.get('/api/get-user-by-ID', authMiddleware, userController.getUserByID); // truyen vao req.body.id -> trả về full thông tin user
   
    router.post('/api/create-new-user', userController.createNewUser); 
    /*
    api tạo tài khoản + tạo mới nhân khẩu:
    - nếu tạo tài khoản -> truyền vào username, password, role (0 or 1), household_number
    - tạo nhân khẩu -> truyền vào các trường thông tin như trong database, có thể bỏ qua username, password, role
    => sau khi tạo mới nhân khẩu, api tự động thêm household_number vào bảng households nếu household_number chưa tồn tại
    */
    
    //router.post('/api/edit-user-profile', userController.editProfile);
    router.delete('/api/delete-user-by-ID', authMiddleware, userController.deleteUserByID) // Truyen vao req.query.userID de xoa 1 user
    
    router.post('/api/login', userController.handleLoging);
    /* api login:
    truyền vào req.body.username, req.body.password
    */

    router.get('/api/get-all-fee', managerController.getFee);
    /* api lấy ra tất cả các khoản phí
    */

    router.get('/api/get-all-feePayment', managerController.getAllFeePayment); // lấy danh sách các khoản phí đã thu
   
    router.post('/api/create-fee', managerController.createFee);
     /* api tạo khoản thu:
     truyền vào req.body.fee_id (int), req.body.amount(int), req.body.period(int)
    */

     router.put('/api/edit-fee', managerController.editFee);
     /* api sửa khoản thu:
     truyền vào req.body.fee_id (int), req.body.amount(int), req.body.period(int)
    */

    router.post('/api/create-contribution-for-manager', managerController.createContribution);
        /* api tạo khoản đóng góp 
        truyền vào req.body.contribution_id, req.body.start_date, req.body.end_date, req.body.content
    -> tạo khoản thu trong bảng FeePayment 
    */

    router.post('/api/create-fee-payments', managerController.createFeePayment);
    /* api tạo khoản thu tiền:
    truyền vào req.body.fee_id (int), req.body.paid_amount(int), req.body.household_number, req.body.submitter_name, req.body.note, req.body.period
    */

    router.get('/api/get-all-households',authMiddleware, householdController.getAllHousehold); // lấy danh sách các hộ khẩu

    router.get('/api/get-distinct-fee-period', managerController.getFeePeriod) // api lấy ra các đợt nộp 
     
    router.get('/api/get-fee-for-household' , householdController.getFee) // api lấy ra mã hộ + khoản cần thu + khoản đã đóng với các đợt đã thu (chưa thu thì không hiện)
    
    router.get('/api/get-unpaid-amount-for-household', householdController.getUnpaidAmount)  // api lấy ra khoản cần thu cho mỗi hộ

    router.get('/api/get-dueAmount-and-totalAmount-for-period', managerController.getPayMents)

    router.get('/api/get-amount-for-each-fee-in-period', managerController.getDetailFee)

    router.post('/api/save-to-log', decodeJWT, userController.saveToLog)  // api lưu lại chỉnh sửa: chỉ cần truyền vào req.body.content

    router.get('/api/get-full-log', userController.getFullLog) // api lấy ra danh sách chỉnh sửa

    /* BẢNG MÃ FEE_ID, CONTRIBUTION_ID, ROLE:
    - phí vệ sinh -> truyền vào req.body.fee_id = 1
    - phí sinh hoạt chung -> truyền vào req.body.fee_id = 2
    - đóng góp lũ lụt -> truyền vào req.body.contribution_id = 1,
    .....

    -ROLE : 0 <-> ke toan
          : 1 <-> to truong
    
    (Chỉ truyền vào id là số)
    */

    return app.use("/", router);
}

module.exports = initWebRoutes;