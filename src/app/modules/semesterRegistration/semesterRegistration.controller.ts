import catchAsync from "../../utils/catchAsync"
import { semesterRegistrationServices } from "./semesterRegistration.service"


const createSemesterRegistration =  catchAsync(async(req, res) =>{
    const result = await semesterRegistrationServices.createSemesterRegistrationIntoDb(req.body)
     res.status(200).json({
         success: true,
         message: "Semester Registration is created successfully",
         data: result
     })
 })

 //get all
 const getAllSemesterRegistrations =  catchAsync(async(req, res) =>{
    const result = await semesterRegistrationServices.getAllSemesterRegistrationFromDb(req.query)
     res.status(200).json({
         success: true,
         message: "All Semester Registration is retrieved successfully",
         data: result
     })
 })

 //get single
 const getSingleSemesterRegistrations =  catchAsync(async(req, res) =>{
    const id = req.params.id;
    const result = await semesterRegistrationServices.getSingleSemesterRegistrationFromDb(id)
     res.status(200).json({
         success: true,
         message: "Semester Registration is retrieved successfully",
         data: result
     })
 })

  //update
  const updateSemesterRegistrations =  catchAsync(async(req, res) =>{
    const id = req.params.id;
    const result = await semesterRegistrationServices.updateSemesterRegistrationFromDb(id, req.body)
     res.status(200).json({
         success: true,
         message: "Semester Registration is updated successfully",
         data: result
     })
 })

 export const semesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistrations,
    updateSemesterRegistrations
 }