import catchAsync from "../../utils/catchAsync"
import { academicDepartmentServices } from "./academicDepartment.service"



const createAcademicDepartment = catchAsync(async(req, res) =>{
    const result = await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body)
    res.status(200).json({
        success: true,
        message: "Academic Department is created successfully",
        data: result
    })
})

//get all 
const getAllAcademicDepartment = catchAsync(async(req, res) =>{
    const result = await academicDepartmentServices.getAllAcademicDepartmentIntoDB()
    res.status(200).json({
        success: true,
        message: "Academic Department are retrieved successfully",
        data: result
    })
})

//get single academic Department
const getSingleAcademicDepartment = catchAsync(async(req, res) =>{
    const id = req.params.departmentId;
    const result = await academicDepartmentServices.getSingleAcademicDepartmentIntoDB(id)
    res.status(200).json({
        success: true,
        message: "Academic Department is retrieved successfully",
        data: result
    })
})

//update academic Department
const updateAcademicDepartment = catchAsync(async(req, res) =>{
    const id = req.params.departmentId
    const result = await academicDepartmentServices.updateAcademicDepartmentIntoDB(id, req.body)
    res.status(200).json({
        success: true,
        message: "Academic Department is updated successfully",
        data: result
    })
})


export const academicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
}