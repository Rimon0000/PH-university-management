
import { UserServices } from "./user.service"
import catchAsync from "../../utils/catchAsync"


const createStudent =  catchAsync(async(req, res) =>{
    const {password, student: studentData} = req.body

   //will call service function to send this data
   const result = await UserServices.createStudentIntoDb(password, studentData)
    res.status(200).json({
        success: true,
        message: "student created successfully",
        data: result
    })
})

//create Admin
const createAdmin =  catchAsync(async(req, res) =>{
    const {password, admin: adminData} = req.body

   //will call service function to send this data
   const result = await UserServices.createAdminIntoDb(password, adminData)
    res.status(200).json({
        success: true,
        message: "Admin created successfully",
        data: result
    })
})

export const UserControllers = {
    createStudent,
    createAdmin,

}