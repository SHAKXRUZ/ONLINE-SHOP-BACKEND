import Joi from "joi";

const carsValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    email: Joi.string().required().email(),
    address: Joi.string().required(),
  });

  return schema.validate(data);
};

const carsUpdateValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    email: Joi.string().required().email(),
    address: Joi.string().required(),
  });

  return schema.validate(data);
};

export { carsValidation, carsUpdateValidation };
