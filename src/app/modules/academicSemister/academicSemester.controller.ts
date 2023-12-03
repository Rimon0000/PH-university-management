import catchAsync from "../../utils/catchAsync"


const createAcademicSemester =  catchAsync(async(req, res) =>{
    // const {password, student: studentData} = req.body

   //will call service function to send this data
//    const result = await UserServices.createStudentIntoDb(password, studentData)
    res.status(200).json({
        success: true,
        message: "student created successfully",
        data: result
    })
})

export const AcademicSemesterControllers = {
    createAcademicSemester,
}