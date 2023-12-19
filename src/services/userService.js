import db from '../models/index';
import bcrypt from 'bcryptjs';
require('dotenv').config();

const salt = bcrypt.genSaltSync(10);

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                raw: true,
            })
            resolve(data)

        } catch (e) {
            reject(e)
        }
    })
};

let getUserByID = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: "missing parameters",
                });
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: id,
                    },
                });
                if (data) {
                    resolve(data);
                } else {
                    resolve({
                        errCode: 2,
                        message: "User not found",
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (await checkUsername(data.username)) {
                resolve({
                    errCode: 1,
                });
            }
            else {
                let hashPassWordFromBcrypt = await hashUserPassword(data.password);
                // Tạo người dùng
                let newUser = await db.User.create({
                    username: data.username,
                    household_number: data.household_number,
                    password: hashPassWordFromBcrypt,
                    full_name: data.full_name,
                    gender: data.gender === '1' ? true : false,
                    alias: data.alias,
                    date_of_birth: data.date_of_birth,
                    place_of_birth: data.place_of_birth,
                    ethnicity: data.ethnicity,
                    occupation: data.occupation,
                    workplace: data.workplace,
                    id_card_number: data.id_card_number,
                    date_of_issue: data.date_of_issue,
                    place_of_issue: data.place_of_issue,
                    date_of_registration: data.date_of_registration,
                    previous_residence: data.previous_residence,
                    role: data.role,
                });
            }
            if (newUser) {

                let householdExists = await db.Households.findOne({
                    where: { household_number: data.household_number },
                });

                if (!householdExists) {
                    await db.Households.create({
                        household_number: data.household_number,
                    });
                }

                resolve({
                    errCode: 0,
                });

            }
            resolve({
                errCode: 1,
            });

        } catch (e) {
            reject(e);
        }
    });

};


let hashUserPassword = (password) => {
    try {
        let hashPassWord = bcrypt.hashSync(password, salt);
        return hashPassWord;
    } catch (e) {
        console.log(e);
    }
}

let deleteUserByID = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let deleted_user = await db.User.findOne({
                where: { id: userID }
            });

            if (!deleted_user) {
                resolve({
                    errCode: 1,
                });
            } else {
                await deleted_user.destroy();
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
};

let handleUserLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUsername(username);
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    attributes: ['id', 'username', 'password', 'role'],
                    where: { username: username },
                    raw: true,

                });
                if (user) {
                    let check = bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        userData.id = user.id;
                        userData.role = user.role;
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 1;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 1;
                    userData.errMessage = `User not found`;
                }

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's username isn't exist in our system, plz try other username`
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { username: username }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllUser: getAllUser,
    getUserByID: getUserByID,
    createNewUser: createNewUser,
    deleteUserByID: deleteUserByID,
    handleUserLogin: handleUserLogin,
    //: editProfile,
}

