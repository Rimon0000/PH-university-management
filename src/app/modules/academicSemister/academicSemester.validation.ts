import { z } from "zod";
import { Months, academicSemesterCode, academicSemesterName } from "./academicSemester.constant";

const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name:z.enum([...academicSemesterName] as [string, ...string[]]),
        code: z.enum([...academicSemesterCode] as [string, ...string[]]),
        year:z.date(),
        startDate: z.enum([...Months] as [string, ...string[]]),
        endDate: z.enum([...Months] as [string, ...string[]]),
    })
})

export const academicSemesterValidations = {
    createAcademicSemesterValidationSchema
}