import { Router } from "express";
import  passport from 'passport'
import Auth from "../middleware/auth.js";

const router = Router();

/** Import all controllers */
import * as userController from '../controllers/usersController.js'; // Import the user controller
import * as analyseController from '../controllers/analyseController.js'; // Import the analyse controller
import * as mailerController from '../controllers/mailer.js'
import * as appointmentController from '../controllers/appointmentController.js'
import * as doctorController from '../controllers/doctorController.js'
import * as prescriptionController from '../controllers/prescriptionController.js'
import * as resultContrtoller from '../controllers/resultController.js'

/** POST Methods */
router.route('/auth/userGoogle').post(userController.registerUserWithGoogle)
router.route('/auth/userForm').post(userController.registerUserWithForm)
router.route('/auth/login').post(userController.authUser)
router.route("/addAnalyse").post(Auth, analyseController.addAnalyse)
router.route("/addAppointment").post(Auth, appointmentController.addAppointment)
router.route("/addEmployer").post(Auth, userController.addEmployer, mailerController.sendWelcomeEmail)
router.route("/addPrescription").post(Auth, prescriptionController.addPrescription)

/** GET Methods */
router.route('/getUser').get(Auth, userController.getUser)
router.route('/getAllEmployers').get(Auth, userController.getAllUsers)
router.route('/getAllPatients').get(Auth, userController.getAllPatients)
router.route('/getAllAnalyses').get(Auth, analyseController.getAllAnalyse)
router.route('/getAllAppointment').get(Auth, appointmentController.getAllAppointment)
router.route('/getAllDoctors').get(Auth, doctorController.getAllDoctors)
router.route('/getAllResults').get(Auth, resultContrtoller.getAllResults)
router.route("/getAllPrescriptions").get(Auth, prescriptionController.getAllPrescriptions)
router.route('/getPrescription/:idPrescription').get(Auth, prescriptionController.getPrescriptionById)
router.route('/getAllResultsNotValidate').get(Auth, resultContrtoller.getAllResultsNotValidate)
router.route('/getFullMedicalFolder/:patientID').get(Auth, userController.fullMedicalFolderPatient)
router.route('/getCountData').get(Auth, userController.countData)

/** DELETE Methods */
router.route('/deleteAnalyse/:analyseId').delete(Auth, analyseController.deleteAnalyse);
router.route('/deleteUser/:employerId').delete(Auth, userController.deleteUser);

/** PUT Methods */
router.route('/updateProfile').put(Auth, userController.updateUser); // is use to update the user profile
router.route('/updateAnalyse/:analyseId').put(Auth, analyseController.updateAnalyse); // is use to update the analyses
router.route('/interpretatePrescription').put(Auth, resultContrtoller.interpretatePrescription)
router.route('/validateResultPrescription').put(Auth, resultContrtoller.validateResultsPrescription)

export default router;
