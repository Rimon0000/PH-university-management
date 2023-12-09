import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

//get all student
const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
  console.log('base query', query);
  const queryObj = {...query}  //copy

  //{email: {$regex: query.searchTerm, $options: 'i'}}
  //{address: {$regex: query.searchTerm, $options: 'i'}}
  //{'name.firstName': {$regex: query.searchTerm, $options: 'i'}}

  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

  let searchTerm = '';
  if(query?.searchTerm){
    searchTerm = query.searchTerm as string;
  }

  //chaining for using two find method
  const searchQuery = Student.find({$or: studentSearchableFields.map((field) =>({
    [field]: {$regex: searchTerm, $options: 'i'}
  }))});

  //filtering
  const excludeFields = ['searchTerm']

  excludeFields.forEach((el) => delete queryObj[el])
  // console.log({query, queryObj});

  const result = await searchQuery.find(queryObj)
  .populate('admissionSemester')
  .populate({path: 'academicDepartment', populate: {path: 'academicFaculty'}})
  return result;
};

//get single student
const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id }).populate('admissionSemester')
  .populate({path: 'academicDepartment', populate: {path: 'academicFaculty'}})

  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};


//Update single student
const updateStudentFromDb = async (id:string, payload: Partial<TStudent>) => {
  const {name, guardian, localGuardian, ...remainingStudentData} = payload;
  const modifiedUpdatedData: Record<string, unknown> = {...remainingStudentData, };

  /* Modify non-primitive data
  guardian: {
    fatherOccupation: "Teacher"
  }

  guardian.fatherOccupation: "Teacher"

  name.firstName = "ron"
  */

  if(name && Object.keys(name).length){
    for(const [key, value] of Object.entries(name)){
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if(guardian && Object.keys(guardian).length){
    for(const [key, value] of Object.entries(guardian)){
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if(localGuardian && Object.keys(localGuardian).length){
    for(const [key, value] of Object.entries(localGuardian)){
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  // console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {new: true, runValidators: true})
  return result

}


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
    throw new Error('Failed to Delete student')
    
  }
};


export const studentServices = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  updateStudentFromDb,
  deleteStudentFromDb,
};
