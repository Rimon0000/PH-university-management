import express from "express";
import { studentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { StudentValidations } from "./student.validation";

const router = express.Router()

//route will call controller function
router.get('/', studentControllers.getAllStudents)

router.get('/:id', studentControllers.getSingleStudent)
router.patch('/:id',validateRequest(StudentValidations.updateStudentValidationSchema), studentControllers.updateStudent)
router.delete('/:id', studentControllers.deleteStudent)

export const studentRoutes = router;