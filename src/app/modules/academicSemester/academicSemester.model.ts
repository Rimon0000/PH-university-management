import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { Months, academicSemesterCode, academicSemesterName } from "./academicSemester.constant";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
  

const academicSemesterSchema =new Schema<TAcademicSemester>({
    name: {type: String,required: true, enum: academicSemesterName},
    code: {type: String, required: true, enum: academicSemesterCode},
    year:{type: String, required: true},
    startMonth:{type: String, required: true, enum: Months},
    endMonth:{type: String, required: true, enum: Months},
},{
    timestamps: true,
}
)

//pre hook/middleware=> check same year a same nam a 2ta semester create hoice kina
academicSemesterSchema.pre('save', async function(next) {
    const isSemesterExists = await AcademicSemester.findOne({
        year : this.year,
        name : this.name,
    }) 
    if(isSemesterExists){
        throw new AppError(httpStatus.NOT_FOUND, 'semester is already exists!!')
    }
    next();
})


export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)


//Name, year
//Autumn 2030 created
//Autumn 2030 xx

//autumn 01
//Summer 02
//Fall 03