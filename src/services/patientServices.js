import { raw } from "body-parser"
import db from "../models/index"
require('dotenv').config();
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash';
import emailServices from "./emailServices";

let postPatientBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !data.email || !data.doctorId || !data.date || !data.timeType) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter',
                })
            }
            else {
                let token = uuidv4();
                await emailServices.sendSimpleEmail({
                    email: data.email,
                    patientName: data.fullName,
                    doctorName: data.doctorName,
                    time: data.time,
                    language: data.language,
                    link: `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${data.doctorId}`
                })

                let patient = await db.User.findOrCreate({
                    where: {
                        email: data.email
                    },
                    defaults: {
                        firstName: data.fullName,
                        email: data.email,
                        gender: data.gender,
                        address: data.address,
                        phonenumber: data.phoneNumber,
                        roleId: 'R3'
                    },
                })
                if (patient && patient[0]) {
                    let res = await db.Booking.findOrCreate({
                        where: {
                            patientId: patient[0].id
                        },
                        defaults: {
                            doctorId: data.doctorId,
                            statusId: 'S1',
                            patientId: patient[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        },
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
        } catch (e) {
            reject(e)
            console.log(e);
        }
    })
}
let postVerifyBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter',
                })
            } else {
                let res = await db.Booking.findOne({
                    where: {
                        token: data.token,
                        doctorId: data.doctorId,
                        statusId: 'S1',
                    },
                    raw: false
                })
                if (res) {
                    res.statusId = 'S2';
                    await res.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Update status success',
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Update status fail',
                    })
                }
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postPatientBooking, postVerifyBook
}