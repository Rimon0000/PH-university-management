import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
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



    //year, code and 4 digit number
    const generatedStudentId = (payload: TAcademicSemester) =>{

    }



    //set manually generated id
    // userData.id = generatedStudentId()

    //create a user
    const newUser = await User.create(userData);

    //create a student
    if(Object.keys(newUser).length){                 //array.length
        //set id, _id as user
        studentData.id = newUser.id              //embedding
        studentData.user = newUser._id             //referencing

        const newStudent = await Student.create(studentData)
        return newStudent;
    }
  };

  export const UserServices = {
    createStudentIntoDb,

  }