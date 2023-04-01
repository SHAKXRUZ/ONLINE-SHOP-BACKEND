import {
  userValidation,
  userLoginValidation,
  userUpdateValidation,
} from "../validation/user_validation.js";
const userRegistrValidation = function (req, res, next) {
  try {
    const { error } = userValidation(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

const userLogiValidation = function (req, res, next) {
  try {
    const { error } = userLoginValidation(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

const userUpdateValidations = function (req, res, next) {
  try {
    const { error } = userUpdateValidation(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export { userRegistrValidation, userLogiValidation, userUpdateValidations };
