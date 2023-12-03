import { studentServices } from "./student.service";
import catchAsync from "../../utils/catchAsync";


//get all
const getAllStudents = catchAsync(async(req, res) =>{
        const result = await studentServices.getAllStudentsFromDb()
        res.status(200).json({
            success: true,
            message: "students are retrieved successfully",
            data: result
        })
})

//get single
const getSingleStudent = catchAsync(async(req, res) =>{
    const id = req.params.studentId
    const result = await studentServices.getSingleStudentFromDb(id)
    res.status(200).json({
        success: true,
        message: "student is retrieved successfully",
        data: result
    })
})


//delete single
const deleteStudent = catchAsync(async(req, res) =>{
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