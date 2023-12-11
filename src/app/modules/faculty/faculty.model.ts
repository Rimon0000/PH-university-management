import { Schema, model } from "mongoose";
import { TFaculty, TUserName } from "./faculty.interface";
import validator from "validator"


const UserNameSchema = new Schema<TUserName>({
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      trim: true,
      maxlength: [20, 'First Name can not be more than 20 characters'],
      validate: {
        validator: function (value: string) {
          //capitalize- Rimon
          const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
          return value === firstNameStr;
        },
        message: '{VALUE} is not in capitalize format.',
      },
    },
    middleName: { type: String, trim: true },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
      trim: true,
      validate: {
        validator: (value: string) => validator.isAlpha(value),
        message: '{VALUE} is not valid.',
      },
    },
  });


  const facultySchema = new Schema<TFaculty>({
    id: {type: String, required: true, unique: true},
    user: {type: Schema.Types.ObjectId,                                //connection between student and user
      required: [true, 'User ID is required'],
      unique: true,
      ref: 'User',
    },              
    name: {
      type: UserNameSchema,
      required: [true, 'Name is required'],
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid',
      },
      required: true,
    },
    dateOfBirth: { type: Date, trim: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
    },
    contactNo: {
      type: String,
      required: [true, 'contactNo is required'],
      trim: true,
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'emergencyContactNo is required'],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'present Address is required'],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, 'permanent Address is required'],
      trim: true,
    },
    profileImage: { type: String },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDeleted: { type: Boolean, default: false },
},{
    timestamps: true,
})


export const Faculty = model<TFaculty>('Faculty', facultySchema)