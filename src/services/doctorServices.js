import { raw } from "body-parser"
import db from "../models/index"
import { reject } from "bcrypt/promises"
require('dotenv').config();
import _ from 'lodash';

const MAX_NUMBER_SHCEDULE = process.env.MAX_NUMBER_SHCEDULE;




let getTopDoctor = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: {
                    roleId: 'R2'
                },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.AllCode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.AllCode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: false,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                where: {
                    roleId: 'R2'
                },
                attributes: {
                    exclude: ['password', 'image']
                }
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e)
        }
    })
}
let saveInforDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.contentHTML || !data.contentMarkdown || !data.priceId
                || !data.paymentId || !data.provinceId || !data.addressClinic || !data.nameClinic) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                if (data.action === "CREATE") {
                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.doctorId,
                    })
                } else if (data.action === "EDIT") {
                    let res = await db.Markdown.findOne({
                        where: { doctorId: data.doctorId },
                        raw: false
                    })
                    if (res) {
                        res.contentHTML = data.contentHTML;
                        res.contentMarkdown = data.contentMarkdown;
                        res.description = data.description;
                        await res.save()
                    }
                }

                let doctorInfor = await db.Doctor_infor.findOne({
                    where: {
                        doctorId: data.doctorId,
                    },

                    raw: false // true: trả ra object
                })
                if (doctorInfor) {
                    doctorInfor.priceId = data.priceId;
                    doctorInfor.paymentId = data.paymentId;
                    doctorInfor.provinceId = data.provinceId;
                    doctorInfor.clinicId = data.clinicId;
                    doctorInfor.specialtyId = data.specialtyId;
                    doctorInfor.addressClinic = data.addressClinic;
                    doctorInfor.nameClinic = data.nameClinic;
                    doctorInfor.note = data.note;
                    await doctorInfor.save()
                }
                else {
                    await db.Doctor_infor.create({
                        doctorId: data.doctorId,
                        priceId: data.priceId,
                        paymentId: data.paymentId,
                        provinceId: data.provinceId,
                        addressClinic: data.addressClinic,
                        nameClinic: data.nameClinic,
                        note: data.nameClinic,
                        clinicId: data.clinicId,
                        specialtyId: data.specialtyId
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Add Infor Doctor Success'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getDetailDoctor = (InputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({
                where: {
                    id: InputId
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Markdown },
                    {
                        model: db.Doctor_infor,
                        include: [
                            { model: db.AllCode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                            { model: db.AllCode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                            { model: db.AllCode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                        ]
                    },
                    { model: db.AllCode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.AllCode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },


                ],
                raw: false,
                nest: true
            })
            if (!data) {
                resolve({
                    errCode: -3,
                    errMessage: 'Not User By ID ....',
                    data: []
                })
            } else {
                if (data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
let getCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SHCEDULE;
                        return item
                    })
                }
                let res = await db.Schedule.findAll({
                    where: {
                        doctorId: data.doctorId,
                        date: data.date
                    },
                    attributes: ['timeType', 'doctorId', 'date', 'maxNumber'],
                    raw: true
                });
                if (res && res.length > 0) {
                    res = res.map(item => {
                        item.date = new Date(item.date).getTime();
                        return item;
                    })
                }
                let toCreate = _.differenceWith(schedule, res, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date;
                })
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate)
                }
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getScheduleByIdDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter',
                })
            }
            let formatedDate = new Date(date).getTime();
            let res = await db.Schedule.findAll({
                where: {
                    doctorId: doctorId,
                    date: formatedDate
                },
                include: [
                    { model: db.AllCode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'] },
                ],
                raw: false,
                nest: true,
            });
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
        } catch (e) {
            reject(e)
            console.log(e);
        }
    })
}

let getInforDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter',
                })
            }
            let res = await db.Doctor_infor.findOne({
                where: {
                    doctorId: doctorId,
                },
                raw: false,
                nest: true,
                include: [
                    { model: db.AllCode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.AllCode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.AllCode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                ],
                attributes: {
                    exclude: ['id', 'doctorId']
                },

            });
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
        } catch (e) {
            reject(e)
        }
    })
}

let getPatientByDoctorId = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter',
                })
            }
            let formatedDate = new Date(date).getTime();
            let res = await db.Booking.findAll({
                where: {
                    statusId: 'S2',
                    doctorId: doctorId,
                    date: formatedDate
                },
                include: [
                    { model: db.AllCode, as: 'timeTypeBookingData', attributes: ['valueEn', 'valueVi'] },
                    {
                        model: db.User,
                        include: [
                            { model: db.AllCode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                        ]
                    }
                ],
                raw: false,
                nest: true,
            });
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
        } catch (e) {
            reject(e)
            console.log(e);
        }
    })
}
module.exports = {
    getTopDoctor: getTopDoctor,
    getAllDoctor: getAllDoctor,
    saveInforDoctor: saveInforDoctor,
    getDetailDoctor: getDetailDoctor,
    getCreateSchedule, getScheduleByIdDate,
    getInforDoctorById, getPatientByDoctorId
}