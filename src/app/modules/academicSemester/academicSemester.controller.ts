import catchAsync from "../../utils/catchAsync"
import { AcademicSemesterServices } from "./academicSemester.service"


const createAcademicSemester =  catchAsync(async(req, res) =>{
   const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)
    res.status(200).json({
        success: true,
        message: "Academic semester is created successfully",
        data: result
    })
})

export const AcademicSemesterControllers = {
    createAcademicSemester,
}