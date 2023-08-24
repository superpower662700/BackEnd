import db from "../models/index";
import CRUDServices from "../services/CRUDServices";


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        // console.log("--------")
        // console.log(data)
        // console.log("--------")
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDServices.createCRUD(req.body);
    return res.render('displayCRUD.ejs', {
        message: message,
    });
}
let displayGetCRUD = async (req, res) => {
    let message = await CRUDServices.getAllUser();
    return res.render('displayCRUD.ejs', {
        message: message,
    });
}
let editCRUD = async (req, res) => {
    let userId = await req.query.id;
    if (userId) {
        let userData = await CRUDServices.getUserInfoById(userId);
        // console.log(userData)
        return res.render('edit-user.ejs', {
            userData: userData
        });
    } else {
        return res.send('User Not Found');
    };
}

let putCRUD = async (req, res) => {
    let message = await CRUDServices.updateUserData(req.body);
    return res.render('displayCRUD.ejs', {
        message: message,
    })
}

let deleteCRUD = async (req, res) => {
    let userId = await req.query.id;
    let message = await CRUDServices.deleteUserData(userId);
    return res.render('displayCRUD.ejs', {
        message: message,
    })
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}