import clinicServices from "../services/clinicServices"


let postCreateClinic = async (req, res) => {
    try {
        let response = await clinicServices.postCreateClinic(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error Clinic '
        })
    }
}
let getAllClinic = async (req, res) => {
    try {
        let response = await clinicServices.getAllClinic(req.query.id);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error Clinic '
        })
    }
}
let getDetailByClinicId = async (req, res) => {
    try {
        let response = await clinicServices.getDetailByClinicId(req.query.id);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error Specialty'
        })
    }
}

module.exports = {
    postCreateClinic, getAllClinic, getDetailByClinicId
    //  getAllClinic, getDetailByClinicId
}