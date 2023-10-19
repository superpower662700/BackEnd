import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from '../controllers/patientController'
import specialtyController from '../controllers/specialtyController'
import clinicController from '../controllers/clinicController'
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.editCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-user', userController.handleGetAllUsers);
    router.post('/api/create-user', userController.handleCreateUser)
    router.put('/api/put-user', userController.handlePutUsers);
    router.delete('/api/delete-user', userController.handleDeleteUser)

    router.get('/api/getAllCode', userController.getAllCode);

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome)
    router.get('/api/get-all-doctor', doctorController.getAllDoctor)
    router.post('/api/save-infor-doctor', doctorController.postInforDoctor)
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById)
    router.post('/api/bulk-create-schedule', doctorController.getBulkCreateSchedule)
    router.get('/api/get-schedule-by-date', doctorController.getScheduleByDate)
    router.get('/api/get-doctor-infor-by-id', doctorController.getDoctorInforById)

    router.post('/api/save-patient-booking', patientController.postPatientBooking)
    router.post('/api/verify-booking-patient', patientController.postVerifyBook)

    router.post('/api/port-create-specialty', specialtyController.postCreateSpecialty)
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty)
    router.get('/api/get-doctorId-by-specialtyId', specialtyController.getDetailBySpecialtyId)

    router.post('/api/port-create-clinic', clinicController.postCreateClinic)
    router.get('/api/get-data-specialty', clinicController.getAllClinic)
    router.get('/api/get-doctorId-by-clinicId', clinicController.getDetailByClinicId)


    router.get('/api/get-schedule-by-doctorId', doctorController.getPatientByDoctorId)
    return app.use("/", router);

}
module.exports = initWebRoutes;