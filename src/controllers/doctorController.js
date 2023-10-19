import doctorServices from "../services/doctorServices"

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10
    try {
        let response = await doctorServices.getTopDoctor(+limit)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever....'
        })
    }
}
let getAllDoctor = async (req, res) => {
    try {
        let doctor = await doctorServices.getAllDoctor();
        return res.status(200).json(doctor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the sever....'
        })
    }
}

let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorServices.saveInforDoctor(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error Add Infor Doctor....'
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                errCode: -2,
                errMessage: 'Missing parameter....'
            })
        }
        else {
            let response = await doctorServices.getDetailDoctor(req.query.id);
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error Detail Doctor By ID....'
        })
    }
}

let getBulkCreateSchedule = async (req, res) => {
    try {
        let response = await doctorServices.getCreateSchedule(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error Detail Doctor By ID...'
        })
    }
}

let getScheduleByDate = async (req, res) => {
    try {
        let response = await doctorServices.getScheduleByIdDate(req.query.doctorId, req.query.date);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error Detail Doctor By ID...'
        })
    }
}

let getDoctorInforById = async (req, res) => {
    try {
        let response = await doctorServices.getInforDoctorById(req.query.doctorId);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error Detail Doctor By ID...'
        })
    }
}

let getPatientByDoctorId = async (req, res) => {
    try {
        let response = await doctorServices.getPatientByDoctorId(req.query.doctorId, req.query.date);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error Detail Doctor By ID...'
        })
    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById, getBulkCreateSchedule, getScheduleByDate,
    getDoctorInforById, getPatientByDoctorId
}