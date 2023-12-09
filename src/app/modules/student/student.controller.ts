import { studentServices } from "./student.service";
import catchAsync from "../../utils/catchAsync";


//get all
const getAllStudents = catchAsync(async(req, res) =>{
        const result = await studentServices.getAllStudentsFromDb(req.query)
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

//update
const updateStudent = catchAsync(async(req, res) =>{
    const id = req.params.studentId
    const students = req.body.student
    const result = await studentServices.updateStudentFromDb(id, students)
    res.status(200).json({
        success: true,
        message: "student is Updated successfully",
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
    updateStudent,
    deleteStudent
}