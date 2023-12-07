import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

//get all student
const getAllStudentsFromDb = async () => {
  const result = await Student.find().populate('admissionSemester')
  .populate({path: 'academicDepartment', populate: {path: 'academicFaculty'}})
  return result;
};

//get single student
const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findById(id).populate('admissionSemester')
  .populate({path: 'academicDepartment', populate: {path: 'academicFaculty'}})

  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

//delete single student
const deleteStudentFromDb = async (id: string) => {

  //Transaction rollback
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    //Transaction-1 in Student
    const deletedStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, {new: true, session});
    if(!deletedStudent){
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to Delete Student !")
    }

    //Transaction-1 in User
    const deletedUser = await User.findOneAndUpdate({ id }, { isDeleted: true }, {new: true, session});
    if(!deletedUser){
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to Delete User !")
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;

  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    
  }
};

export const studentServices = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
};
