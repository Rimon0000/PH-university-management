import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { studentRoutes } from "../modules/student/student.route";
import { academicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { adminRoutes } from "../modules/admin/admin.route";
import { facultyRoutes } from "../modules/faculty/faculty.route";
import { CourseRoutes } from "../modules/course/course.route";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.route";
import { offeredCourseRoutes } from "../modules/offeredCourse/offeredCourse.route";

const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/students',
        route: studentRoutes
    },
    {
        path: '/academic-semesters',
        route: academicSemesterRoutes
    },
    {
        path: '/academic-faculties',
        route: academicFacultyRoutes
    },
    {
        path: '/academic-departments',
        route: academicDepartmentRoutes
    },
    {
        path: '/admins',
        route: adminRoutes
    },
    {
        path: '/faculties',
        route: facultyRoutes
    },
    {
        path: '/courses',
        route: CourseRoutes
    },
    {
        path: '/semester-registrations',
        route: semesterRegistrationRoutes
    },
    {
        path: '/offered-courses',
        route: offeredCourseRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;