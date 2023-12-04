import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterValidations } from "./academicSemester.validation";

const router = express.Router()

//route will call controller function
router.post('/create-academic-semester', validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester)
router.get('/', AcademicSemesterControllers.getAllAcademicSemester)


// router.get('/:studentId', studentControllers.getSingleStudent)
// router.delete('/:studentId', studentControllers.deleteStudent)

export const academicSemesterRoutes = router;