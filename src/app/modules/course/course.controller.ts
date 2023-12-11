import catchAsync from "../../utils/catchAsync"
import { CourseServices } from "./course.service"


const createCourse =  catchAsync(async(req, res) =>{
   const result = await CourseServices.createCourseIntoDb(req.body)
    res.status(200).json({
        success: true,
        message: "Course is created successfully",
        data: result
    })
})

//get all 
const getAllCourses = catchAsync(async(req, res) =>{
    const result = await CourseServices.getAllCoursesFromDb()
    res.status(200).json({
        success: true,
        message: "Course are retrieved successfully",
        data: result
    })
})

//get single Course
const getSingleCourse = catchAsync(async(req, res) =>{
    const id = req.params.id;
    const result = await CourseServices.getSingleCoursesFromDb(id)
    res.status(200).json({
        success: true,
        message: "Course is retrieved successfully",
        data: result
    })
})

//update Course
const updateCourse = catchAsync(async(req, res) =>{
    const id = req.params.id;
    const result = CourseServices.updateCourseFromDb(id, req.body)
    res.status(200).json({
        success: true,
        message: "Course is updated successfully",
        data: result
    })
})

//delete Course
const deleteCourse = catchAsync(async(req, res) =>{
    const id = req.params.id;
    const result = CourseServices.deleteCourseFromDb(id)
    res.status(200).json({
        success: true,
        message: "Course is Deleted successfully",
        data: result
    })
})

export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse
}