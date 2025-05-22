import * as Yup from 'yup';
import type {LoginFormData, RegistrationFormData, UserFormData} from '../types/formTypes';

// --- Login Form ---
export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
});

export const loginInitialValues: LoginFormData = {
    email: '',
    password: '',
};

// --- User Registration Form ---
export const registrationValidationSchema = Yup.object({
    username: Yup.string()
        .trim()
        .required('Username is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Confirm password is required'),
    avatar_url: Yup.string()
});

export const registrationInitialValues: RegistrationFormData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar_url: '',
};

// --- User Edit Form ---
export const userEditValidationSchema = Yup.object({
    name: Yup.string()
        .required('Username is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .nullable(),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .when('password', {
            is: (val: string | null | undefined) => val && val.length > 0,
            then: (schema) => schema.required('Confirm password is required')
        })
        .nullable(),
    avatar_url: Yup.string()
        .url('Avatar URL must be a valid URL')
        .nullable()
});

export const userEditEmptyValues: UserFormData = {
    name: '',
    email: '',
    avatar_url: '',
    password: '',
    confirmPassword: ''
};
