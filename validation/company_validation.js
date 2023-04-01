import Joi from "joi";

const companyValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    email: Joi.string().required().email(),
    address: Joi.string().required(),
  });

  return schema.validate(data);
};

const companyUpdateValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    email: Joi.string().required().email(),
    address: Joi.string().required(),
  });

  return schema.validate(data);
};

export { companyValidation, companyUpdateValidation };
