import { NextFunction, Request, Response } from "express";
import { studentServices } from "./student.service";


//get all
const getAllStudents = async(req : Request, res : Response, next: NextFunction) =>{
    try{
        const result = await studentServices.getAllStudentsFromDb()
        res.status(200).json({
            success: true,
            message: "students are retrieved successfully",
            data: result
        })
    }catch(err){
        next(err)
    }
}

//get single
const getSingleStudent = async(req: Request, res: Response, next: NextFunction) =>{
    try {
        const id = req.params.studentId
        const result = await studentServices.getSingleStudentFromDb(id)
        res.status(200).json({
            success: true,
            message: "student is retrieved successfully",
            data: result
        })
    } catch (err) {
        next(err)
    }
}


//delete single
const deleteStudent = async(req: Request, res: Response, next: NextFunction) =>{
    try {
        const id = req.params.studentId
        const result = await studentServices.deleteStudentFromDb(id)
        res.status(200).json({
            success: true,
            message: "student is deleted successfully",
            data: result
        })    
    } catch (err) {
        next(err)
    }
}

export const studentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent
}