import {Joi} from "joi";

export const validateUser = Joi.object({
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    dateOfBirth : Joi.date().required(),
    gender : Joi.string().valid("male", "female").required(),
    email : Joi.email().required(),
    password: Joi.string()
        .min(8)  // Minimum 8 characters
        .max(20)  // Maximum 20 characters
        .required()  // Password is required
        .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+={}:;,.<>?/-]*$'))  // Only alphanumeric and special chars allowed
        .message('Password must include at least one uppercase letter, one lowercase letter, and one special character')
        .pattern(/[a-z]/, 'lowercase')  // Requires lowercase letters
        .pattern(/[A-Z]/, 'uppercase')  // Requires uppercase letters
        .pattern(/[0-9]/, 'digit')  // Requires digits
        .pattern(/[!@#$%^&*(),.?":{}|<>]/, 'special'),  // Requires special characters
    phone : Joi.number().required(),
    address : Joi.string().required()
});

export const validateAdmin = Joi.object({
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    dateOfBirth : Joi.date().required(),
    gender : Joi.string().valid("male", "female").required(),
    email : Joi.email().required(),
    password: Joi.string()
        .min(8)  // Minimum 8 characters
        .max(20)  // Maximum 20 characters
        .required()  // Password is required
        .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+={}:;,.<>?/-]*$'))  // Only alphanumeric and special chars allowed
        .message('Password must include at least one uppercase letter, one lowercase letter, and one special character')
        .pattern(/[a-z]/, 'lowercase')  // Requires lowercase letters
        .pattern(/[A-Z]/, 'uppercase')  // Requires uppercase letters
        .pattern(/[0-9]/, 'digit')  // Requires digits
        .pattern(/[!@#$%^&*(),.?":{}|<>]/, 'special'),  // Requires special characters
    phone : Joi.number().required(),
    address : Joi.string().required(),
    isSuperAdmin : Joi.boolean().required()
});

export const validateDriver = Joi.object({
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    dateOfBirth : Joi.date().required(),
    gender : Joi.string().valid("male", "female").required(),
    email : Joi.email().required(),
    password: Joi.string()
        .min(8)  // Minimum 8 characters
        .max(20)  // Maximum 20 characters
        .required()  // Password is required
        .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+={}:;,.<>?/-]*$'))  // Only alphanumeric and special chars allowed
        .message('Password must include at least one uppercase letter, one lowercase letter, and one special character')
        .pattern(/[a-z]/, 'lowercase')  // Requires lowercase letters
        .pattern(/[A-Z]/, 'uppercase')  // Requires uppercase letters
        .pattern(/[0-9]/, 'digit')  // Requires digits
        .pattern(/[!@#$%^&*(),.?":{}|<>]/, 'special'),  // Requires special characters
    phone : Joi.number().required(),
    address : Joi.string().required(),
    stateOfOrigin : Joi.string().required()
});


export const validateVehicle = Joi.object({
    manufacturer: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number()
      .integer()
      .max(new Date().getFullYear()) // Can't be a future year
      .required(),
    color: Joi.string()
      .required(),
    plateNumber: Joi.string().required()
});

