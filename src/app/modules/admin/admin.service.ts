import QueryBuilder from "../../builder/QueryBuilder";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model"
import { adminSearchableFields } from "./admin.constant";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

//get all admins
const getAllAdminsFromDb =async (query: Record<string, unknown>) => {
    //for class uses
    const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(adminSearchableFields).filter().sort().paginate().fields()

    const result = await adminQuery.modelQuery
    return result;
}

//get single admin
const getSingleAdminFromDb =async (id: string) => {
    const result = await Admin.findById(id)
    return result;
}

//update single admin
const updateAdminFromDb =async (id:string, payload: Partial<TAdmin>) => {
    const {name, ...remainingAdminData} = payload
    const modifiedUpdatedData: Record<string, unknown> = {...remainingAdminData, };

    if(name && Object.keys(name).length){
        for(const [key, value] of Object.entries(name)){
          modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {new: true, runValidators: true})
    return result;
}


//delete single admin
const deleteAdminFromDb =async (id:string) => {
    //Transaction rollback- start session
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        //Transaction-1
        const deletedAdmin = await Admin.findByIdAndUpdate(id, {isDeleted: true}, {new: true, session})
        if(!deletedAdmin){
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to Delete Admin!")
        }

        //get user _id from deleted admin
        const userId = deletedAdmin.user;

        //Transaction-2
        const deletedUser = await User.findByIdAndUpdate(userId, {isDeleted: true}, {new: true, session})
        if(!deletedUser){
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to Delete User!")
        }

        await session.commitTransaction()
        await session.endSession()
        return deletedAdmin;
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new Error('Failed to Delete Admin');
    }
}

export const adminServices = {
    getAllAdminsFromDb,
    getSingleAdminFromDb,
    updateAdminFromDb,
    deleteAdminFromDb
}