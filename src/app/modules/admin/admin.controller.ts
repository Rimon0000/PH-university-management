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

//update single admin
const updateAdmin = catchAsync(async(req, res) =>{
    const id = req.params.id 
    const admins = req.body.admin;
    const result = await adminServices.updateAdminFromDb(id, admins)
    res.status(200).json({
        success: true,
        message: "Admin is Updated successfully",
        data: result
    })
})

//delete single admin
const deleteAdmin = catchAsync(async(req, res) =>{
    const id = req.params.id 
    const result = await adminServices.deleteAdminFromDb(id);
    res.status(200).json({
        success: true,
        message: "Admin is Deleted successfully",
        data: result
    })
})

export const adminControllers = {
    getAllAdmins,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin
}