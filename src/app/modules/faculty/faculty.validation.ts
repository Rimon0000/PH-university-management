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


const createFacultyValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        faculty: z.object({
            name: createUserNameValidationSchema,
            gender: z.enum(['male', 'female', 'other']),
            dateOfBirth: z.string().optional(),
            email: z.string().email(),
            contactNo: z.string().min(1),
            emergencyContactNo: z.string().min(1),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
            presentAddress: z.string().min(1),
            permanentAddress: z.string().min(1),
            profileImage: z.string().optional(),
            academicDepartment: z.string(),
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


const updateFacultyValidationSchema = z.object({
    body: z.object({
        faculty: z.object({
            name: updateUserNameValidationSchema.optional(),
            gender: z.enum(['male', 'female', 'other']).optional(),
            dateOfBirth: z.string().optional(),
            email: z.string().email().optional(),
            contactNo: z.string().min(1).optional(),
            emergencyContactNo: z.string().min(1).optional(),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
            presentAddress: z.string().min(1).optional(),
            permanentAddress: z.string().min(1).optional(),
            profileImage: z.string().optional(),
            academicDepartment: z.string().optional(),
            })
    })
});


export const FacultyValidations = {
    createFacultyValidationSchema,
    updateFacultyValidationSchema,
};
