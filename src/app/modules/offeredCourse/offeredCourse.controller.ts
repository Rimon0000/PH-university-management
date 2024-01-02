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

const getAllOfferedCourse = catchAsync(async(req, res) =>{
    const result = await offeredCourseServices.getOfferedCourseFromDb(req.query)
    res.status(200).json({
        success: true,
        message: "Offered Course is retrieved successfully",
        data: result
    })
})

//update offered Course
const updateOfferedCourse = catchAsync(async(req, res) =>{
    const id = req.params.id;
    const result = await offeredCourseServices.updateOfferedCourseIntoDb(id, req.body)
    res.status(200).json({
        success: true,
        message: "Offered Course is Updated successfully",
        data: result
    })

})


export const offeredCourseControllers = {
    createOfferedCourse,
    getAllOfferedCourse,
    updateOfferedCourse,
}