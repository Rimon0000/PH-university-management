import catchAsync from "../../utils/catchAsync"
import { offeredCourseServices } from "./offeredCourse.service"

const createOfferedCourse = catchAsync(async(req, res) =>{
    const result = await offeredCourseServices.createOfferedCourseIntoDb(req.body)
    res.status(200).json({
        success: true,
        message: "Offered Course is created successfully",
        data: result
    })
})


export const offeredCourseControllers = {
    createOfferedCourse,
}