import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";

const router = express.Router()

//route will call controller function
router.post('/create-academic-semester', AcademicSemesterControllers.createAcademicSemester)


// router.get('/', studentControllers.getAllStudents)
// router.get('/:studentId', studentControllers.getSingleStudent)
// router.delete('/:studentId', studentControllers.deleteStudent)

export const academicSemesterRoutes = router;