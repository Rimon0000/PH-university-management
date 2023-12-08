import * as z from 'zod';

//for create
const createUserNameValidationSchema = z.object({
    firstName: z.string()
        .min(1)
        .max(20)
        .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
            message: 'First Name must be in capitalize format'
        }),
    middleName: z.string().optional(),
    lastName: z.string()
        .refine(value => /^[a-zA-Z]+$/.test(value), {
            message: 'Last Name must contain only alphabetic characters'
        })
});

const createGuardianValidationSchema = z.object({
    fatherName: z.string().min(1),
    fatherOccupation: z.string().min(1),
    fatherContactNo: z.string().min(1),
    motherName: z.string().min(1),
    motherOccupation: z.string().min(1),
    motherContactNo: z.string().min(1)
});

const createLocalGuardianValidationSchema = z.object({
    name: z.string().min(1),
    occupation: z.string().min(1),
    contactNo: z.string().min(1),
    address: z.string().min(1)
});

const createStudentValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        student: z.object({
            name: createUserNameValidationSchema,
            gender: z.enum(['male', 'female', 'other']),
            dateOfBirth: z.string().optional(),
            email: z.string().email(),
            contactNo: z.string().min(1),
            emergencyContactNo: z.string().min(1),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
            presentAddress: z.string().min(1),
            permanentAddress: z.string().min(1),
            guardian: createGuardianValidationSchema,
            localGuardian: createLocalGuardianValidationSchema,
            admissionSemester: z.string(),
            academicDepartment: z.string(),
            profileImage: z.string().optional(),
            })
    })
});


//for update
const updateUserNameValidationSchema = z.object({
    firstName: z.string()
        .min(1)
        .max(20)
        .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
            message: 'First Name must be in capitalize format'
        }).optional(),
    middleName: z.string().optional(),
    lastName: z.string()
        .refine(value => /^[a-zA-Z]+$/.test(value), {
            message: 'Last Name must contain only alphabetic characters'
        }).optional()
});

const updateGuardianValidationSchema = z.object({
    fatherName: z.string().min(1).optional(),
    fatherOccupation: z.string().min(1).optional(),
    fatherContactNo: z.string().min(1).optional(),
    motherName: z.string().min(1).optional(),
    motherOccupation: z.string().min(1).optional(),
    motherContactNo: z.string().min(1).optional()
});

const updateLocalGuardianValidationSchema = z.object({
    name: z.string().min(1).optional(),
    occupation: z.string().min(1).optional(),
    contactNo: z.string().min(1).optional(),
    address: z.string().min(1).optional()
});

const updateStudentValidationSchema = z.object({
    body: z.object({
        student: z.object({
            name: updateUserNameValidationSchema.optional(),
            gender: z.enum(['male', 'female', 'other']).optional(),
            dateOfBirth: z.string().optional(),
            email: z.string().email().optional(),
            contactNo: z.string().min(1).optional(),
            emergencyContactNo: z.string().min(1).optional(),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
            presentAddress: z.string().min(1).optional(),
            permanentAddress: z.string().min(1).optional(),
            guardian: updateGuardianValidationSchema.optional(),
            localGuardian: updateLocalGuardianValidationSchema.optional(),
            admissionSemester: z.string().optional(),
            academicDepartment: z.string().optional(),
            profileImage: z.string().optional(),
            })
    })
});


export const StudentValidations = {
    createStudentValidationSchema,
    updateStudentValidationSchema,
};
