import Joi, { ObjectSchema } from "joi";

export const registerSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string().required().email().messages({
    'string.base': 'Email must be of type string.',
    'string.email': 'Email must be valid.',
    'string.empty': 'Email is a required field'
  }),
  password: Joi.string().required().min(6).max(25).messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Invalid password',
    'string.max': 'Invalid password',
    'string.empty': 'Password is a required field'
  }),
})
export const loginSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string().required().email().messages({
    'string.base': 'Email must be of type string.',
    'string.email': 'Email must be valid.',
    'string.empty': 'Email is a required field'
  }),
  password: Joi.string().required().min(6).max(25).messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Invalid password',
    'string.max': 'Invalid password',
    'string.empty': 'Password is a required field'
  }),
})
