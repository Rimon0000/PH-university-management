import httpStatus from "http-status";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import AppError from "../../errors/AppError";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";


const createSemesterRegistrationIntoDb = async (payload:TSemesterRegistration) => {
    const academicSemester = payload?.academicSemester

    //check if the academic semester is exists in academic semester database
    const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester)
    if(!isAcademicSemesterExists){
        throw new AppError(httpStatus.NOT_FOUND, 'This academic semester is not found')
    }

    //check if the semester is already registered or not?
    const isSemesterRegistrationExists = await SemesterRegistration.findOne({academicSemester})
    if(isSemesterRegistrationExists){
        throw new AppError(httpStatus.CONFLICT, 'This semester is already registered')
    }

    const result = await SemesterRegistration.create(payload)
    return result;   
}

//get all
const getAllSemesterRegistrationFromDb = async(query: Record<string, unknown>) =>{
    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate('academicSemester'), query).filter().sort().paginate().fields()
    const result = await semesterRegistrationQuery.modelQuery
    return result;
}

//get single
const getSingleSemesterRegistrationFromDb = async(id:string) =>{
    const result = await SemesterRegistration.findById(id)
    return result;
}

//update
const updateSemesterRegistrationFromDb = async(id:string, payload: Partial<TSemesterRegistration>) =>{
    const result = await SemesterRegistration.findById(id, payload)
    return result;
}


export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDb,
    getAllSemesterRegistrationFromDb,
    getSingleSemesterRegistrationFromDb,
    updateSemesterRegistrationFromDb
}