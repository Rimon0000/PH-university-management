import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generatedStudentId } from "./user.utils";

const createStudentIntoDb = async (password: string, payload: TStudent) => {
    const userData: Partial<TUser> = {}

    //if password is not given, use default password
    userData.password = password || config.default_password as string
    // if(!password){
    //     userData.password = config.default_password as string;
    // }
    // else{
    //     userData.password = password
    // }

    //set student role
    userData.role = "student"

    //find academic semester info
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

    //set manually generated id
    userData.id = generatedStudentId(admissionSemester)

    //create a user
    const newUser = await User.create(userData);

    //create a student
    if(Object.keys(newUser).length){                 //array.length
        //set id, _id as user
        payload.id = newUser.id              //embedding
        payload.user = newUser._id             //referencing

        const newStudent = await Student.create(payload)
        return newStudent;
    }
  };

  export const UserServices = {
    createStudentIntoDb,

  }