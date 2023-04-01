import { Router } from "express";
import { registrUser } from "../controller/registr.js";
import { loginUser } from "../controller/login.js";
import {
  getUsers,
  updateUser,
  deleteUser,
  getUser,
} from "../controller/users_ctr.js";
import {
  userRegistrValidation,
  userLogiValidation,
  userUpdateValidations,
} from "../middleware/user_validation_middleware.js";
let router = Router();

router.post("/registr", userRegistrValidation, registrUser);
router.post("/login", userLogiValidation, loginUser);
router.get("/list", getUsers);
router.get("/list/:id", getUser);
router.put("/update", userUpdateValidations, updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
