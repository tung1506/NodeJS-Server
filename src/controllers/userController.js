import userService from '../services/userService';
import jwt from 'jsonwebtoken';

let getAllUser = async (req, res) => {
    let userdata = await userService.getAllUser();

    return res.status(200).json(userdata);
}

let getUserByID = async (req, res) => {
    let data = await userService.getUserByID(req.body.id);
    return res.status(200).json(data);
}

let createNewUser = async (req, res) => {
    let data = await userService.createNewUser(req.body);

    if (data.errCode === 0) {
        return res.status(201).json({
            message: 'created user successfully',
        });
    }
    if (data.errCode === 1) {
        return res.status(201).json({
            message: 'username already exists',
        });
    } else {
        return res.status(500).json({
            message: 'internal server error',
        });
    }
};

let editProfile = async (req, res) => {
    let data = await userService.editProfile(req.body);

    if (data.errCode === 0) {
        return res.status(201).json({
            message: 'edit profile successfully',
        });
    }
    else {
        return res.status(500).json({
            message: 'internal server error',
        });
    }
};

let deleteUserByID = async (req, res) => {
    // Kiểm tra xem user_id có tồn tại hay không
    if (!req.query.userID) {
        return res.status(400).json({ error: 'Missing user_id in query parameters, require userID in req.params' });
    }

    let deleted_user = await userService.deleteUserByID(req.query.userID);

    if (deleted_user.errCode == 1) {
        return res.status(404).json({ error: 'User not found' });
    }
    return res.status(201).json(deleted_user);
}

let handleLoging = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        });
    }

    let login = await userService.handleUserLogin(username, password);

    if (login.errCode === 0) {
        const token = jwt.sign({ id: login.id }, process.env.JWT_KEY, { expiresIn: '12h' });

        return res.status(200).json({
            login,
            token,
        });
    }
    return res.status(400).json({ error: login.errMessage });

};

let saveToLog = async (req, res) => {
    let data = await userService.saveToLog(req.body, req.user.dataValues.full_name);

    return res.status(201).json(data);
};

let getFullLog = async (req, res) => {
    let data = await userService.getFullLog();

    return res.status(201).json(data);
};

module.exports = {
    getAllUser: getAllUser,
    getUserByID: getUserByID,
    createNewUser: createNewUser,
    deleteUserByID: deleteUserByID,
    handleLoging: handleLoging,
    editProfile: editProfile,
    saveToLog: saveToLog,
    getFullLog: getFullLog,
}