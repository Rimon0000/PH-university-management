import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

//find last student id and last 4 digit
const lastStudentId =async () => {
    const lastStudent = await User.findOne({role:"student"},{id: 1, _id: -1}).sort({createdAt: -1}).lean()
    return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
    
}

//year, code and 4 digit number
export const generatedStudentId = async(payload: TAcademicSemester) =>{
    //first time 0000
    const currentId = await lastStudentId() || (0).toString();
    let incrementId = (parseInt(currentId) + 1).toString().padStart(4, '0');

    incrementId = `${payload.year}${payload.code}${incrementId}`
    return incrementId;
}