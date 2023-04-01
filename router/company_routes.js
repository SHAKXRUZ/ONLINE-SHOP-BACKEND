import { Router } from "express";

import {
  getCompanys,
  getCompany,
  createCompany,
  deleteCompany,
  updateCompany,
} from "../controller/company_ctr.js";

import {
  companyCreateValidation,
  companyUpdateValidations,
} from "../middleware/company_validation_middleware.js";

let router = Router();

router.post("/create", companyCreateValidation, createCompany);
router.delete("/delete/:id", deleteCompany);
router.get("/companys", getCompanys);
router.get("/company/:id", getCompany);
router.put("/update", companyUpdateValidations, updateCompany);

export default router;
