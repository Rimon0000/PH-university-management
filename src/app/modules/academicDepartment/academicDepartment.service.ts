import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";


const createAcademicDepartmentIntoDB =async (payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload)
    return result;
}

//get all
const getAllAcademicDepartmentIntoDB = async() =>{
    const result = await AcademicDepartment.find()
    return result
}

//get single academic Department
const getSingleAcademicDepartmentIntoDB = async(_id: string) =>{
    const result = AcademicDepartment.findById({_id})
    return result;
}

//update
const updateAcademicDepartmentIntoDB =async (_id: string, payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.findOneAndUpdate({_id}, payload, {new: true})
    return result;   
}

export const academicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentIntoDB,
    getSingleAcademicDepartmentIntoDB,
    updateAcademicDepartmentIntoDB
}