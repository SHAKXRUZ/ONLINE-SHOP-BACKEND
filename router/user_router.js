import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} from "../controller/users_ctr.js";
let router = Router();

router.get("/list", getUsers);
router.post("/create", createUser);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);
router.delete("/one:", getUser);

export default router;
