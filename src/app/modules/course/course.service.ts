import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";


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