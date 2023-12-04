import { academicSemesterNameCodeMapper } from "./academicSemester.constant"
import { TAcademicSemester } from "./academicSemester.interface"
import { AcademicSemester } from "./academicSemester.model"

const createAcademicSemesterIntoDB =async (payload:TAcademicSemester) => {

    //check semester name => semester code
    if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new Error('Invalid Semester code !!')
    }

    const result = await AcademicSemester.create(payload)
    return result;
}

//get all
const getAllAcademicSemesterIntoDB = async() =>{
    const result = await AcademicSemester.find()
    return result
}

//get single academic semester
const getSingleAcademicSemesterIntoDB = async(_id: string) =>{
    const result = AcademicSemester.findOne({_id})
    return result;
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterIntoDB,
    getSingleAcademicSemesterIntoDB
}