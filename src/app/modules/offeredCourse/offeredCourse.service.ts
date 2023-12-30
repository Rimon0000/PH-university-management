import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";


const createOfferedCourseIntoDb =async (payload:TOfferedCourse) => {
    const {semesterRegistration, academicFaculty, academicDepartment, course, faculty} = payload;

    //1. check if the semester Registration id is exists
    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration)
    const academicSemester = isSemesterRegistrationExists?.academicSemester;

    if(!isSemesterRegistrationExists){
        throw new AppError(httpStatus.NOT_FOUND, "semester Registration is not found!!")
    }

    //2. check if the academic Faculty id is exists
    const isAcademicFacultyExists = await AcademicFaculty.findById(academicFaculty)
    if(!isAcademicFacultyExists){
        throw new AppError(httpStatus.NOT_FOUND, "Academic Faculty is not found!!")
    }

    //3. check if the academic Department id is exists
    const isAcademicDepartmentExists = await AcademicDepartment.findById(academicDepartment)
    if(!isAcademicDepartmentExists){
        throw new AppError(httpStatus.NOT_FOUND, "academic Department is not found!!")
    }

    //4. check if the course id is exists
    const isCourseExists = await Course.findById(course)
    if(!isCourseExists){
        throw new AppError(httpStatus.NOT_FOUND, "course is not found!!")
    }

    //5. check if the Faculty id is exists
    const isFacultyExists = await Faculty.findById(faculty)
    if(!isFacultyExists){
        throw new AppError(httpStatus.NOT_FOUND, "Faculty is not found!!")
    }



    const result = await OfferedCourse.create({...payload, academicSemester})
    return result;
}

//get all



export const offeredCourseServices = {
    createOfferedCourseIntoDb,
}