import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

//get all student
const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
  // console.log('base query', query);
  // const queryObj = {...query}  //copy

  // //{email: {$regex: query.searchTerm, $options: 'i'}}
  // //{address: {$regex: query.searchTerm, $options: 'i'}}
  // //{'name.firstName': {$regex: query.searchTerm, $options: 'i'}}

  // const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

  // let searchTerm = '';
  // if(query?.searchTerm){
  //   searchTerm = query.searchTerm as string;
  // }

  // //method chaining for using two or more find method(searching)
  // const searchQuery = Student.find({$or: studentSearchableFields.map((field) =>({
  //   [field]: {$regex: searchTerm, $options: 'i'}
  // }))});

  // //filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']

  // excludeFields.forEach((el) => delete queryObj[el])
  // // console.log({query}, {queryObj});

  // const filterQuery =  searchQuery.find(queryObj)
  // .populate('admissionSemester')
  // .populate({path: 'academicDepartment', populate: {path: 'academicFaculty'}})

  //sorting
  // let sort = '-createdAt';
  // if(query.sort){
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort)

  //limit
  // let page = 1
  // let limit = 1
  // let skip = 0;

  // if(query.limit){
  //   limit = Number(query.limit);
  // }

  // if(query.page){
  //   page = Number(query.page)
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip)

  // const limitQuery = paginateQuery.limit(limit)

  // //field limiting
  // let fields = "-__v";

  // /*
  // fields: 'name,email'
  // convert to
  // fields: 'name email' 
  //  */

  // if(query.fields){
  //   fields = (query.fields as string).split(",").join(" ")
  // }
  // const fieldQuery = await limitQuery.select(fields)

  // return fieldQuery;


  //for class uses
  const studentQuery = new QueryBuilder(Student.find().populate('admissionSemester')
  .populate({path: 'academicDepartment', populate: {path: 'academicFaculty'}}), query)
  .search(studentSearchableFields).filter().sort().paginate().fields();

  const result = await studentQuery.modelQuery;
  return result;
};



//get single student
const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findById( id ).populate('admissionSemester')
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

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {new: true, runValidators: true})
  return result

}


//delete single student
const deleteStudentFromDb = async (id: string) => {
  //Transaction rollback
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    //Transaction-1 in Student
    const deletedStudent = await Student.findByIdAndUpdate( id, { isDeleted: true }, {new: true, session});
    if(!deletedStudent){
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to Delete Student !")
    }

    //get user _id from deletedStudent
    const userId = deletedStudent.user;

    //Transaction-2 in User
    const deletedUser = await User.findByIdAndUpdate(userId, { isDeleted: true }, {new: true, session});
    if(!deletedUser){
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to Delete User !")
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;

  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to Delete student');
  }
};


export const studentServices = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  updateStudentFromDb,
  deleteStudentFromDb,
};
