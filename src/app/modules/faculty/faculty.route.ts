import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { facultyControllers } from "./faculty.controller";
import { FacultyValidations } from "./faculty.validation";

const router = express.Router()

router.get('/', facultyControllers.getAllFaculties)
router.get('/:id', facultyControllers.getSingleFaculty)
router.patch('/:id', validateRequest(FacultyValidations.updateFacultyValidationSchema), facultyControllers.updateFaculty)
router.delete('/:id', facultyControllers.deleteFaculty)


export const facultyRoutes = router;