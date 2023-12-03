import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { Months, academicSemesterCode, academicSemesterName } from "./academicSemester.constant";
  

const academicSemesterSchema =new Schema<TAcademicSemester>({
    name: {type: String,required: true, enum: academicSemesterName},
    code: {type: String, required: true, enum: academicSemesterCode},
    year:{Type: Date, required: true},
    startMonth:{Type: String, required: true, enum: Months},
    endMonth:{Type: String, required: true, enum: Months},
},{
    timestamps: true,
}
)

export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)