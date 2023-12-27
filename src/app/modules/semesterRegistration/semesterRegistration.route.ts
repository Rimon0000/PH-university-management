import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { semesterRegistrationValidations } from "./semesterRegistration.validation";
import { semesterRegistrationControllers } from "./semesterRegistration.controller";


const router = express.Router()

//route will call controller function
router.post('/create-semester-registration', validateRequest(semesterRegistrationValidations.createSemesterRegistrationValidationSchema), semesterRegistrationControllers.createSemesterRegistration)
router.get("/", semesterRegistrationControllers.getAllSemesterRegistrations)
router.get("/:id", semesterRegistrationControllers.getSingleSemesterRegistrations)
router.patch("/:id", validateRequest(semesterRegistrationValidations.updateSemesterRegistrationValidationSchema), semesterRegistrationControllers.updateSemesterRegistrations)

export const semesterRegistrationRoutes = router;