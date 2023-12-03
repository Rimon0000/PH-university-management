import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";


const academicSemesterSchema =new Schema<TAcademicSemester>({
    name: {type: String, enum: ['Autumn', 'Summer', 'Fall']},
    code: {type: String, enum: ['01', '02', '03']},
    year:{Type: Date},
    startMonth:{Type: Date},
    endMonth:{Type: Date}
})

export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)