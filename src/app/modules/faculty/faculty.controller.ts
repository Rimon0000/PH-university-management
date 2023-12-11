import catchAsync from "../../utils/catchAsync";
import { facultyServices } from "./faculty.service";

//get all faculty
const getAllFaculties = catchAsync(async(req, res)=>{
    const result = await facultyServices.getAllFacultiesFromDb(req.query)
    res.status(200).json({
        success: true,
        message: "Faculties are retrieved successfully",
        data: result
    })
})

//get single faculty
const getSingleFaculty = catchAsync(async(req, res) =>{
    const id = req.params.id;
    const result = await facultyServices.getSingleFacultyFromDb(id)
    res.status(200).json({
        success: true,
        message: "Faculty is retrieved successfully",
        data: result
    })
})

//update single faculty
const updateFaculty = catchAsync(async(req, res) =>{
    const id = req.params.id 
    const faculties = req.body.faculty;
    const result = await facultyServices.updateFacultyFromDb(id, faculties)
    res.status(200).json({
        success: true,
        message: "Faculty is Updated successfully",
        data: result
    })
})

//delete single faculty
const deleteFaculty = catchAsync(async(req, res) =>{
    const id = req.params.id 
    const result = await facultyServices.deleteFacultyFromDb(id);
    res.status(200).json({
        success: true,
        message: "Faculty is Deleted successfully",
        data: result
    })
})

export const facultyControllers = {
    getAllFaculties,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty
}