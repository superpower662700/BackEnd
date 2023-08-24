import bcrypt from 'bcryptjs';
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);


let createCRUD = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcryptjs = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcryptjs,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.inputAddress,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (users) {
                resolve(users)
            } else {
                resolve([])
            };
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            })


            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;

            await user.save();
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)

        } catch (e) {
            reject(e);
        }
    })
}
let deleteUserData = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy({
                where: { id: userId },
            })
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })

}
module.exports = {
    createCRUD: createCRUD,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserData: deleteUserData
}