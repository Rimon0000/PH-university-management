import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model"

const createAcademicFacultyIntoDB =async (payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payload)
    return result;
}

//get all
const getAllAcademicFacultyIntoDB = async() =>{
    const result = await AcademicFaculty.find()
    return result
}

//get single academic faculty
const getSingleAcademicFacultyIntoDB = async(_id: string) =>{
    const result = AcademicFaculty.findById({_id})
    return result;
}

//update
const updateAcademicFacultyIntoDB =async (_id: string, payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.findOneAndUpdate({_id}, payload, {new: true})
    return result;   
}

export const academicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultyIntoDB,
    getSingleAcademicFacultyIntoDB,
    updateAcademicFacultyIntoDB
}