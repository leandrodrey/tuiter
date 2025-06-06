import * as Yup from 'yup';
import type {LoginFormData, RegistrationFormData, UserFormData} from '../types/formTypes';

/**
 * Validation schema for the login form
 */
export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
});

/**
 * Initial empty values for the login form
 */
export const loginInitialValues: LoginFormData = {
    email: '',
    password: '',
};

/**
 * Validation schema for the user registration form
 */
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
        .url('Avatar URL must be a valid URL')
        .nullable()
});

/**
 * Initial empty values for the registration form
 */
export const registrationInitialValues: RegistrationFormData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar_url: '',
};

/**
 * Validation schema for the user edit form
 */
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

/**
 * Initial empty values for the user edit form
 */
export const userEditEmptyValues: UserFormData = {
    name: '',
    email: '',
    avatar_url: '',
    password: '',
    confirmPassword: ''
};
