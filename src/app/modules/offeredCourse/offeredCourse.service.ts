import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { hasTimeConflict } from "./offeredCourse.utils";
import QueryBuilder from "../../builder/QueryBuilder";


const createOfferedCourseIntoDb =async (payload:TOfferedCourse) => {
    const {semesterRegistration, academicFaculty, academicDepartment, course, section, faculty, days, startTime, endTime} = payload;

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

    //check if the department is belong to the faculty
    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({_id:academicDepartment, academicFaculty})
    if(!isDepartmentBelongToFaculty){
        throw new AppError(httpStatus.BAD_REQUEST, `This ${isAcademicDepartmentExists.name} is not belong to this ${isAcademicFacultyExists.name}`)
    }

    //check if the same offered course same section in same registered semester exists
    const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSection = await OfferedCourse.findOne({semesterRegistration, course, section})
    if(isSameOfferedCourseExistsWithSameRegisteredSemesterWithSection){
        throw new AppError(httpStatus.BAD_REQUEST, "Offered Course with same section is already exists!!")
    }

    //get the schedule of the faculties
    const assignedSchedules = await OfferedCourse.find({semesterRegistration, 
        faculty, days: {$in: days}}).select('days startTime endTime')

    const newSchedule = {days, startTime, endTime}

   if(hasTimeConflict(assignedSchedules, newSchedule)){
    throw new AppError(httpStatus.CONFLICT, "This faculty is not available at that time ! Please choose other Time or Day!!")
   }

    const result = await OfferedCourse.create({...payload, academicSemester})
    return result;
}


//get all Offered Course
const getOfferedCourseFromDb = async(query: Record<string, unknown>) =>{
    const offeredCourseQuery = new QueryBuilder(OfferedCourse.find()
    .populate('semesterRegistration')
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('course')
    .populate('faculty'), query).filter().sort().paginate().fields()
    const result = await offeredCourseQuery.modelQuery
    return result;
}

//get single Offered Course
const getSingleOfferedCourseFromDb = async(id: string) =>{
    const result = await OfferedCourse.findById(id)
    .populate('semesterRegistration')
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('course')
    .populate('faculty')
    
    return result;
}



//Update Offered Course
const updateOfferedCourseIntoDb =async (id:string, payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>) => {
    const {faculty, days, startTime, endTime} = payload

    //check id's data is exists
    const isOfferedCourseExists = await OfferedCourse.findById(id)
    if(!isOfferedCourseExists){
        throw new AppError(httpStatus.NOT_FOUND, "Offered Course is not found!!")
    }

    //check if faculty exists
    const isFacultyExists = await Faculty.findById(faculty)
    if(!isFacultyExists){
        throw new AppError(httpStatus.NOT_FOUND, "Faculty is not found!!")
    }

    //get semesterRegistration
    const semesterRegistration = isOfferedCourseExists.semesterRegistration;

    //check semester Registration status is UPCOMING
    const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration)
    if(semesterRegistrationStatus?.status !== 'UPCOMING'){
        throw new AppError(httpStatus.BAD_REQUEST, `You can not Update this Offered Course as it is ${semesterRegistrationStatus?.status}!!`) 
    }

    //get the schedule of the faculties
    const assignedSchedules = await OfferedCourse.find({semesterRegistration, 
        faculty, days: {$in: days}}).select('days startTime endTime')

    const newSchedule = {days, startTime, endTime}

   if(hasTimeConflict(assignedSchedules, newSchedule)){
    throw new AppError(httpStatus.CONFLICT, "This faculty is not available at that time ! Please choose other Time or Day!!")
   }

   const result = await OfferedCourse.findByIdAndUpdate(id, payload, {new: true})
   return result;

}



export const offeredCourseServices = {
    createOfferedCourseIntoDb,
    getOfferedCourseFromDb,
    getSingleOfferedCourseFromDb,
    updateOfferedCourseIntoDb
}