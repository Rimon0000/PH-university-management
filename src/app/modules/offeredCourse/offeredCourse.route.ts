import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { offeredCourseValidations } from "./offeredCourse.validation";
import { offeredCourseControllers } from "./offeredCourse.controller";


const router = express.Router()

router.post('/create-offered-course', validateRequest(offeredCourseValidations.createOfferedCourseValidationSchema), offeredCourseControllers.createOfferedCourse)
router.get('/', offeredCourseControllers.getAllOfferedCourse)
router.patch('/:id', validateRequest(offeredCourseValidations.updateOfferedCourseValidationSchema), offeredCourseControllers.updateOfferedCourse)



export const offeredCourseRoutes = router;