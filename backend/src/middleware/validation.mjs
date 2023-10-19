import Joi from 'joi';

export const signupValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};
