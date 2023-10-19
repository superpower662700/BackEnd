import { raw } from "body-parser"
import db from "../models/index"
require('dotenv').config();
import _ from 'lodash';

let postCreateSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.descriptionHTML || !data.descriptionMarkdown || !data.image) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter',
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    image: data.image
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Create a new specialty success',
                })
            }
        }
        catch (e) {
            reject(e)
            console.log(e);
        }
    })
}
let getAllSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data === 'ALL') {
                let res = await db.Specialty.findAll();
                if (!res) {
                    resolve({
                        errCode: 0,
                        data: [],
                    })
                } else {
                    resolve({
                        errCode: 0,
                        data: res,
                    })
                }
            };
            if (data && data !== 'ALL') {
                let res = await db.Specialty.findOne({
                    where: { id: data },
                })
                if (!res) {
                    resolve({
                        errCode: 0,
                        data: [],
                    })
                } else {
                    resolve({
                        errCode: 0,
                        data: res,
                    })
                }
            }

        }
        catch (e) {
            reject(e)
        }
    })
}
let getDetailBySpecialtyId = (specialtyId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!specialtyId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter',
                })
            }
            else {
                if (location === 'ALL') {
                    let res = await db.Doctor_infor.findAll({
                        where: {
                            specialtyId: specialtyId
                        },
                        attributes: ['doctorId'],
                    })
                    if (!res) {
                        resolve({
                            errCode: 0,
                            data: [],
                        })
                    } else {
                        resolve({
                            errCode: 0,
                            data: res,
                        })
                    }
                } else {
                    let res = await db.Doctor_infor.findAll({
                        where: {
                            specialtyId: specialtyId,
                            provinceId: location
                        },
                        attributes: ['doctorId'],
                    })
                    if (!res) {
                        resolve({
                            errCode: 0,
                            data: [],
                        })
                    } else {
                        resolve({
                            errCode: 0,
                            data: res,
                        })
                    }
                }

            }

        }
        catch (e) {
            reject(e)
        }
    })
}
// let postVerifyBook = (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (!data.token || !data.doctorId) {
//                 resolve({
//                     errCode: 1,
//                     errMessage: 'Missing parameter',
//                 })
//             } else {
//                 let res = await db.Booking.findOne({
//                     where: {
//                         token: data.token,
//                         doctorId: data.doctorId,
//                         statusId: 'S1',
//                     },
//                     raw: false
//                 })

//             }
//         }
//         catch (e) {
//             reject(e)
//         }
//     })
// }

module.exports = {
    postCreateSpecialty, getAllSpecialty, getDetailBySpecialtyId
}