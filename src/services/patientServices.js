import { raw } from "body-parser"
import db from "../models/index"
require('dotenv').config();
import _ from 'lodash';
import { emit } from "nodemon";

let postPatientBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !data.email || !data.doctorId || !data.date || !data.timeType) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter',
                })
            }
            let patient = await db.User.findOrCreate({
                where: {
                    email: data.email
                },
                defaults: {
                    email: data.email,
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
                        timeType: data.timeType
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

        } catch (e) {
            reject(e)
            console.log(e);
        }
    })
}

module.exports = {
    postPatientBooking
}