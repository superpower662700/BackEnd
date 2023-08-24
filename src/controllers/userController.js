import userServices from "../services/userServices";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    console.log('your email: ' + email);
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing inputs parameter'
        })
    }
    let userData = await userServices.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user ? userData.user : {}

    })
}
let handleGetAllUsers = async (req, res) => {
    if (!req.query.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Not ID',
            users: []
        })
    }
    else {
        let users = await userServices.getAllUsers(req.query.id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            users,
        })
    }

}
let handleCreateUser = async (req, res) => {
    let users = await userServices.CreateUser(req.body);
    return res.status(200).json(users)
}
let handlePutUsers = async (req, res) => {
    let users = await userServices.updateUser(req.body.data.user);
    return res.status(200).json({
        errCode: users.errCode,
        errMessage: users.errMessage,
    })

}

let handleDeleteUser = async (req, res) => {
    let data = await userServices.DeleteUser(req.body.id);
    return res.status(200).json({
        errCode: data.errCode,
        errMessage: data.errMessage,
    })
}
let getAllCode = async (req, res) => {
    let data = await userServices.ServiceGetCode(req.query.type);
    try {
        return res.status(200).json(
            data)

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error'
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateUser: handleCreateUser,
    handleDeleteUser: handleDeleteUser,
    handlePutUsers: handlePutUsers,
    getAllCode: getAllCode
}