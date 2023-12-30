import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { offeredCourseValidations } from "./offeredCourse.validation";
import { offeredCourseControllers } from "./offeredCourse.controller";


const router = express.Router()

router.post('/create-offered-course', validateRequest(offeredCourseValidations.createOfferedCourseValidationSchema), offeredCourseControllers.createOfferedCourse)



export const offeredCourseRoutes = router;