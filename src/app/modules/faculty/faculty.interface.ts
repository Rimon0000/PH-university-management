import { Types } from "mongoose";

export type TUserName = {
    firstName: string;
    middleName?:string;
    lastName: string;
}

export type TFaculty = {
    id:string;
    user: Types.ObjectId;
    designation: string;
    name: TUserName;
    gender: "male"|"female" | "other";
    dateOfBirth: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    profileImage?: string;
    academicDepartment: Types.ObjectId;
    isDeleted: boolean;
};