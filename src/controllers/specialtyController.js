import specialtyServices from "../services/specialtyServices"


let postCreateSpecialty = async (req, res) => {
    try {
        let response = await specialtyServices.postCreateSpecialty(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error Specialty '
        })
    }
}
let getAllSpecialty = async (req, res) => {
    try {
        let response = await specialtyServices.getAllSpecialty(req.query.id);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error Specialty'
        })
    }
}
let getDetailBySpecialtyId = async (req, res) => {
    try {


        let response = await specialtyServices.getDetailBySpecialtyId(req.query.id, req.query.location);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error Specialty'
        })
    }
}

module.exports = {
    postCreateSpecialty, getAllSpecialty, getDetailBySpecialtyId
}