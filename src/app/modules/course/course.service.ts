import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";


const createCourseIntoDb =async (payload:TCourse) => {
    const result = await Course.create(payload)
    return result;
}

//get all
const getAllCoursesFromDb =async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query).search(courseSearchableFields).filter().sort().paginate().fields();
    const result = await courseQuery.modelQuery;
    return result;
}

//get single
const getSingleCoursesFromDb =async (id: string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course')
    return result;
}

//update course
const updateCourseFromDb =async (id: string, payload: Partial<TCourse>) => {
    const {preRequisiteCourses, ...courseRemainingData} = payload;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        //step-1: update basic course info
        const updatedBasicCourseInfo = await Course.findByIdAndUpdate(id, courseRemainingData, {new: true, runValidators: true, session})

        if(!updatedBasicCourseInfo){
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to Update Course");
        }

        //check if there is any pre requisite course to update
        if(preRequisiteCourses && preRequisiteCourses.length > 0){
        //filter out the deleted fields
        const deletedPreRequisites = preRequisiteCourses.filter(el => el.course && el.isDeleted)
        .map(el => el.course)

        const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
            $pull: {preRequisiteCourses: {course: {$in: deletedPreRequisites }}}
        }, {new: true, runValidators:true, session})

        if(!deletedPreRequisiteCourses){
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to Update Course");
        }


        //filter out the added fields
        const newPreRequisites = preRequisiteCourses?.filter(el => el.course && !el.isDeleted)
        const newPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
        $addToSet: {preRequisiteCourses: {$each: newPreRequisites}}
        }, {new: true, runValidators:true, session}) 
        
        if(!newPreRequisiteCourses){
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to Update Course");
        }
        };

        await session.commitTransaction()
        await session.endSession()

        const result = await Course.findById(id).populate('preRequisiteCourses.course')
        return result;
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update Course")
    }
}

//delete
const deleteCourseFromDb =async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, {isDeleted: true},{new: true})
    return result;
}


//assign faculties
const assignFacultiesWithCourseIntoDb = async(id: string, payload: Partial<TCourseFaculty>) =>{
    const result = await CourseFaculty.findByIdAndUpdate(id,
        {
            course: id, $addToSet: {faculties: {$each: payload}}
        }, {upsert: true, new: true});

    return result;
}



export const CourseServices = {
    createCourseIntoDb,
    getAllCoursesFromDb,
    getSingleCoursesFromDb,
    updateCourseFromDb,
    deleteCourseFromDb,
    assignFacultiesWithCourseIntoDb

}