import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentServices } from "./student.service";


//higher order function
const catchAsync = (fn: RequestHandler) =>{
    return (req:Request, res:Response, next:NextFunction) =>{
        Promise.resolve(fn(req, res, next)).catch((err) => next(err))
    }
}

//get all
const getAllStudents: RequestHandler = catchAsync(async(req, res, next) =>{
        const result = await studentServices.getAllStudentsFromDb()
        res.status(200).json({
            success: true,
            message: "students are retrieved successfully",
            data: result
        })
})

//get single
const getSingleStudent: RequestHandler = catchAsync(async(req, res, next) =>{
    const id = req.params.studentId
    const result = await studentServices.getSingleStudentFromDb(id)
    res.status(200).json({
        success: true,
        message: "student is retrieved successfully",
        data: result
    })
})


//delete single
const deleteStudent: RequestHandler = catchAsync(async(req, res, next) =>{
    const id = req.params.studentId
    const result = await studentServices.deleteStudentFromDb(id)
    res.status(200).json({
        success: true,
        message: "student is deleted successfully",
        data: result
    })    
})

export const studentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent
}