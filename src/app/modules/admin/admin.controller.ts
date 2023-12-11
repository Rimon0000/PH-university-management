import catchAsync from "../../utils/catchAsync";
import { adminServices } from "./admin.service";

//get all admins
const getAllAdmins = catchAsync(async(req, res)=>{
    const result = await adminServices.getAllAdminsFromDb(req.query)
    res.status(200).json({
        success: true,
        message: "Admins are retrieved successfully",
        data: result
    })
})

//get single admin
const getSingleAdmin = catchAsync(async(req, res) =>{
    const id = req.params.id;
    const result = await adminServices.getSingleAdminFromDb(id)
    res.status(200).json({
        success: true,
        message: "Admin is retrieved successfully",
        data: result
    })
})

export const adminControllers = {
    getAllAdmins,
    getSingleAdmin,
}