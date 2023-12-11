import { TCourse } from "./course.interface";
import { Course } from "./course.model";


const createCourseIntoDb =async (payload:TCourse) => {
    const result = await Course.create(payload)
    return result;
}

//get all
const getAllCoursesFromDb =async () => {
    const result = await Course.find()
    return result;
}

//get single
const getSingleCoursesFromDb =async (id: string) => {
    const result = await Course.findById(id)
    return result;
}

//update
const updateCourseFromDb =async (id: string, payload: Partial<TCourse>) => {
    const result = await Course.findByIdAndUpdate(id, {payload}, {new: true})
    return result;
}

//delete
const deleteCourseFromDb =async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, {isDeleted: true},{new: true})
    return result;
}


export const CourseServices = {
    createCourseIntoDb,
    getAllCoursesFromDb,
    getSingleCoursesFromDb,
    updateCourseFromDb,
    deleteCourseFromDb

}