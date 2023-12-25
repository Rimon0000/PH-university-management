import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { semesterRegistrationValidations } from "./semesterRegistration.validation";
import { semesterRegistrationControllers } from "./semesterRegistration.controller";


const router = express.Router()

//route will call controller function
router.post('/create-semester-registration', validateRequest(semesterRegistrationValidations.createSemesterRegistrationValidationSchema), semesterRegistrationControllers.createSemesterRegistration)


export const semesterRegistrationRoutes = router;