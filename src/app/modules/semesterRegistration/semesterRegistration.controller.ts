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


 export const semesterRegistrationControllers = {
    createSemesterRegistration,
 }