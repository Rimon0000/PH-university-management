import QueryBuilder from "../../builder/QueryBuilder";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { Faculty } from "./faculty.model";
import { facultySearchableFields } from "./faculty.constant";
import { TFaculty } from "./faculty.interface";

//get all faculty
const getAllFacultiesFromDb =async (query: Record<string, unknown>) => {
    //for class uses
    const facultyQuery = new QueryBuilder(Faculty.find().populate('academicDepartment'), query)
    .search(facultySearchableFields).filter().sort().paginate().fields()

    const result = await facultyQuery.modelQuery
    return result;
}

//get single faculty
const getSingleFacultyFromDb =async (id: string) => {
    const result = await Faculty.findById(id)
    return result;
}

//update single faculty
const updateFacultyFromDb =async (id:string, payload: Partial<TFaculty>) => {
    const {name, ...remainingFacultyData} = payload
    const modifiedUpdatedData: Record<string, unknown> = {...remainingFacultyData, };

    if(name && Object.keys(name).length){
        for(const [key, value] of Object.entries(name)){
          modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {new: true, runValidators: true})
    return result;
}


//delete single faculty
const deleteFacultyFromDb =async (id:string) => {
    //Transaction rollback- start session
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        //Transaction-1
        const deletedFaculty = await Faculty.findByIdAndUpdate(id, {isDeleted: true}, {new: true, session})
        if(!deletedFaculty){
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to Delete Faculty!")
        }

        //get user _id from deleted admin
        const userId = deletedFaculty.user;

        //Transaction-2
        const deletedUser = await User.findByIdAndUpdate(userId, {isDeleted: true}, {new: true, session})
        if(!deletedUser){
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to Delete User!")
        }

        await session.commitTransaction()
        await session.endSession()
        return deletedFaculty;
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new Error('Failed to Delete Faculty');
    }
}

export const facultyServices = {
    getAllFacultiesFromDb,
    getSingleFacultyFromDb,
    updateFacultyFromDb,
    deleteFacultyFromDb
}