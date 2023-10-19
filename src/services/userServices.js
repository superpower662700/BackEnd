import { raw } from "body-parser";
import db from "../models/index"
import bcrypt from 'bcryptjs';

const { reject } = require("bcrypt/promises")

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            if ((await checkUserEmail(email))) {
                let user = await db.User.findOne({
                    where: { email: email },
                    raw: true,
                    attributes: ['id', 'email', 'password', 'roleId', 'firstName', 'lastName']
                })
                let check = await bcrypt.compareSync(password, user.password);
                if (check) {
                    userData.errCode = 0;
                    userData.errMessage = "ok";
                    delete user.password;
                    userData.user = user;
                    resolve(userData)
                } else {
                    userData.errCode = 3;
                    userData.errMessage = 'Wrong pw';
                    resolve(userData)
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = "Email isnot exist"
                resolve(userData)
            }
        } catch (e) {
            reject(e);
        }
    })
}
let checkUserEmail = (useremail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: useremail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            };
        } catch (e) {
            reject(e);
        }
    })
}
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = db.User.findAll({
                    raw: true,
                    attributes: {
                        exclude: ['password']
                    }
                });

            };
            if (userId && userId !== 'ALL') {
                users = db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })

}

let CreateUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 2,
                    errMessage: 'Your email is already in used, Plz try another email!'
                })
            }
            else {
                let hashPasswordFromBcryptjs = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcryptjs,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.position,
                    image: data.avatar,
                })
                let users = await db.User.findAll({
                    raw: true,
                });

                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    user: users
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let DeleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkid = await db.User.findOne({
                where: { id: userId }
            })
            if (!checkid) {
                resolve({
                    errCode: 2,
                    errMessage: 'The user isn`t exist',
                })
            }
            else {
                await db.User.destroy({
                    where: { id: userId },
                })
                resolve({
                    errCode: 0,
                    errMessage: 'The user is deleted',
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters',
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false // nếu true thì k thay đổi db mà chỉ trong js
            })

            if (user) {

                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                user.gender = data.gender;
                user.roleId = data.roleId;
                user.positionId = data.position;
                if (data.avatar) {
                    user.image = data.avatar;
                }


                await user.save();

                resolve({
                    errCode: 0,
                    errMessage: 'The user is Updated',
                })
            }
            else {
                resolve({
                    errCode: 2,
                    errMessage: 'The user is not Updated',
                })
            }


        } catch (e) {
            reject(e);
        }
    })
}
let ServiceGetCode = (typeInput) => {
    return new Promise(async (resolve, reject) => {

        if (!typeInput) {
            resolve({
                errCode: 2,
                errMessage: 'Missing requied parameters'
            })
        } else {
            let res = {}
            let allCode = await db.AllCode.findAll({
                where: { type: typeInput }
            });
            res.errCode = 0;
            res.data = allCode
            resolve(
                res
            )
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    CreateUser: CreateUser,
    DeleteUser: DeleteUser,
    updateUser: updateUser,
    ServiceGetCode: ServiceGetCode
}