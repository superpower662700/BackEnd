import patientServices from "../services/patientServices"

let postPatientBooking = async (req, res) => {
    try {
        let response = await patientServices.postPatientBooking(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error Detail Doctor By ID...'
        })
    }
}
let postVerifyBook = async (req, res) => {
    try {
        let response = await patientServices.postVerifyBook(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error Detail Doctor By ID...'
        })
    }
}
module.exports = {
    postPatientBooking, postVerifyBook
}