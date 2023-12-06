import catchAsync from "../../utils/catchAsync";
import { academicFacultyServices } from "./academicFaculty.service";


const createAcademicFaculty = catchAsync(async(req, res) =>{
    const result = await academicFacultyServices.createAcademicFacultyIntoDB(req.body)
    res.status(200).json({
        success: true,
        message: "Academic Faculty is created successfully",
        data: result
    })
})

//get all 
const getAllAcademicFaculty = catchAsync(async(req, res) =>{
    const result = await academicFacultyServices.getAllAcademicFacultyIntoDB()
    res.status(200).json({
        success: true,
        message: "Academic Faculty are retrieved successfully",
        data: result
    })
})

//get single academic Faculty
const getSingleAcademicFaculty = catchAsync(async(req, res) =>{
    const id = req.params.facultyId;
    const result = await academicFacultyServices.getSingleAcademicFacultyIntoDB(id)
    res.status(200).json({
        success: true,
        message: "Academic Faculty is retrieved successfully",
        data: result
    })
})

//update academic faculty
const updateAcademicFaculty = catchAsync(async(req, res) =>{
    const id = req.params.facultyId
    const result = await academicFacultyServices.updateAcademicFacultyIntoDB(id, req.body)
    res.status(200).json({
        success: true,
        message: "Academic Faculty is retrieved successfully",
        data: result
    })
})


export const academicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
}