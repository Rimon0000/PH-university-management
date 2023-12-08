import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generatedStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createStudentIntoDb = async (password: string, payload: TStudent) => {
    const userData: Partial<TUser> = {}

    //if password is not given, use default password
    userData.password = password || config.default_password as string

    //set student role
    userData.role = "student"

    //find academic semester info
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)


    //Transaction Rollback
    const session = await mongoose.startSession();          //start session

    try {
      session.startTransaction();                      //start Transaction

      //set generated id
    userData.id = await generatedStudentId(admissionSemester)

    //create a user(Transaction-1)
    const newUser = await User.create([userData], {session});    //array

    if(!newUser.length){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User!')
    } 
      
    //set id, _id as user
    payload.id = newUser[0].id                        //embedding
    payload.user = newUser[0]._id                     //referencing

    //create a Student (Transaction-2)
    const newStudent = await Student.create([payload], {session})

    if(!newStudent.length){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student!')
    } 

    await session.commitTransaction();          //commit transaction
    await session.endSession();                 //end session

    return newStudent;

    } catch (error) {
      await session.abortTransaction();          //abort transaction
      await session.endSession();                //end session
      throw new Error('Failed to Create student')
    }


  };

  export const UserServices = {
    createStudentIntoDb,

  }