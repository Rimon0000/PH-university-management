import express from "express";
import { studentControllers } from "./student.controller";

const router = express.Router()

//route will call controller function
router.get('/', studentControllers.getAllStudents)

router.get('/:studentId', studentControllers.getSingleStudent)
router.delete('/:studentId', studentControllers.deleteStudent)

export const studentRoutes = router;