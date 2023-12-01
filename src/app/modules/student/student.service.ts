import { Student } from './student.model';

//get all student
const getAllStudentsFromDb = async () => {
  const result = await Student.find();
  return result;
};

//get single student
const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({id})
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

//delete single student
const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
};
