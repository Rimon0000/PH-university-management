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
    const result = await CourseServices.getAllCoursesFromDb(req.query)
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
    const result = await CourseServices.updateCourseFromDb(id, req.body)
    res.status(200).json({
        success: true,
        message: "Course is updated successfully",
        data: result
    })
})

//delete Course
const deleteCourse = catchAsync(async(req, res) =>{
    const id = req.params.id;
    const result = await CourseServices.deleteCourseFromDb(id)
    res.status(200).json({
        success: true,
        message: "Course is Deleted successfully",
        data: result
    })
})


//assign faculties inside course
const assignFacultiesWithCourse = catchAsync(async(req, res) =>{
    const {courseId} = req.params;
    const {faculties} = req.body
    const result = await CourseServices.assignFacultiesWithCourseIntoDb(courseId, faculties)
    res.status(200).json({
        success: true,
        message: "Faculties Assigned successfully",
        data: result
    })
})

//remove faculties from course
const removeFacultiesFromCourse = catchAsync(async(req, res) =>{
    const {courseId} = req.params;
    const {faculties} = req.body
    const result = await CourseServices.removeFacultiesFromCourseFromDb(courseId, faculties)
    res.status(200).json({
        success: true,
        message: "Faculties remove successfully",
        data: result
    })
})


export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse
}