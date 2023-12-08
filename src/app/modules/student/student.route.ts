import express from "express";
import { studentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { StudentValidations } from "./student.validation";

const router = express.Router()

//route will call controller function
router.get('/', studentControllers.getAllStudents)

router.get('/:studentId', studentControllers.getSingleStudent)
router.patch('/:studentId',validateRequest(StudentValidations.updateStudentValidationSchema), studentControllers.updateStudent)
router.delete('/:studentId', studentControllers.deleteStudent)

export const studentRoutes = router;