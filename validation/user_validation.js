import Joi from "joi";

const userValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    age: Joi.number().required(),
    email: Joi.string().required().email(),
    password: Joi.string()
      .min(8)
      .max(50)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  return schema.validate(data);
};

const userLoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string()
      .min(8)
      .max(50)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  return schema.validate(data);
};

const userUpdateValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().min(3).max(50).required(),
    age: Joi.number().required(),
    email: Joi.string().required().email(),
    password: Joi.string()
      .min(8)
      .max(50)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    role: Joi.string().min(4).max(5).required(),
    company_id: Joi.string(),
  });

  return schema.validate(data);
};

export { userValidation, userLoginValidation, userUpdateValidation };
