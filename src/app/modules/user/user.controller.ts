import { Request, Response } from "express"
import StudentValidationSchema from "../student/student.validation"
import { UserServices } from "./user.service"


const createStudent =  async(req : Request, res : Response) =>{
    try{
        //creating a schema validation using Zod
        const {password, student: studentData} = req.body

       //data validation using zod
    //    const zodParsedData = StudentValidationSchema.parse(studentData)

       //will call service function to send this data
       const result = await UserServices.createStudentIntoDb(password, studentData)

        //send response
        res.status(200).json({
            success: true,
            message: "student created successfully",
            data: result
        })

    }catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error: error
        })
    }
}

export const UserControllers = {
    createStudent,

}