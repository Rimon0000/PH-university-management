import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";

const router = express.Router()

//route will call controller function
router.post('/create-course', validateRequest(CourseValidations.createCourseValidationSchema), CourseControllers.createCourse)
router.get('/', CourseControllers.getAllCourses)
router.get('/:id', CourseControllers.getSingleCourse)
router.delete('/:id', CourseControllers.deleteCourse)

router.patch('/:id',validateRequest(CourseValidations.updateCourseValidationSchema), CourseControllers.updateCourse)

//for assign and remove faculties
router.put("/:courseId/assign-faculties", validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.assignFacultiesWithCourse)
router.delete("/:courseId/remove-faculties", validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.removeFacultiesFromCourse)

export const CourseRoutes = router;