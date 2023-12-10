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

export const adminControllers = {
    getAllAdmins,
}