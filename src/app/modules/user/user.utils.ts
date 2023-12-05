import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

//find last student id
const findLastStudentId =async () => {
    const lastStudent = await User.findOne({role:"student"},{id: 1, _id: -1}).sort({createdAt: -1}).lean()
    return lastStudent?.id ? lastStudent.id : undefined;
}

//year, code and 4 digit number
export const generatedStudentId = async(payload: TAcademicSemester) =>{
   
    //first time 0000 by default
    let currentId = (0).toString();

    //2030 01 0001
    const lastStudentId = await findLastStudentId()
    const lastStudentSemesterCode = lastStudentId?.substring(4,6)  //01
    const lastStudentSemesterYear = lastStudentId?.substring(0,4)  //2030
    const currentSemesterCode = payload?.code;
    const currentSemesterYear = payload?.year;

    if(lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentSemesterYear === currentSemesterYear){
        currentId = lastStudentId.substring(6) //0001
    }

    let incrementId = (parseInt(currentId) + 1).toString().padStart(4, '0');

    incrementId = `${payload.year}${payload.code}${incrementId}`
    return incrementId;
}