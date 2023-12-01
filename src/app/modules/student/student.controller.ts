import { Request, Response } from "express";
import { studentServices } from "./student.service";


//get all
const getAllStudents = async(req : Request, res : Response) =>{
    try{
        const result = await studentServices.getAllStudentsFromDb()
        res.status(200).json({
            success: true,
            message: "students are retrieved successfully",
            data: result
        })
    }catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error: error
        })
    }
}

//get single
const getSingleStudent = async(req: Request, res: Response) =>{
    try {
        const id = req.params.studentId
        const result = await studentServices.getSingleStudentFromDb(id)
        res.status(200).json({
            success: true,
            message: "student is retrieved successfully",
            data: result
        })
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error: error
        })
    }
}


//delete single
const deleteStudent = async(req: Request, res: Response) =>{
    try {
        const id = req.params.studentId
        const result = await studentServices.deleteStudentFromDb(id)
        res.status(200).json({
            success: true,
            message: "student is deleted successfully",
            data: result
        })
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error: error
        })
    }
}

export const studentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent
}