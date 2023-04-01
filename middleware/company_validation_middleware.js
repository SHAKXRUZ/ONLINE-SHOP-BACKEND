import {
  companyValidation,
  companyUpdateValidation,
} from "../validation/company_validation.js";
const companyCreateValidation = function (req, res, next) {
  try {
    const { error } = companyValidation(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

const companyUpdateValidations = function (req, res, next) {
  try {
    const { error } = companyUpdateValidation(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export { companyCreateValidation, companyUpdateValidations };
