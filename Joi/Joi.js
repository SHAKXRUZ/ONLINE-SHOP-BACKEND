import userValidation from "../validation/user_validation.js";
import companyValidation from "../validation/company_validation.js";

router.post("/user/registr", (req, res) => {
  console.log(req.body);
  res.status(201).send("Zor");
  const { error } = userValidation(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({ msg: error.details[0].message });
  }
});

router.post("/user/login", (req, res) => {
  console.log(req.body);
  res.status(201).send("Zor");
  const { error } = userValidation(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({ msg: error.details[0].message });
  }
});

router.post("/user/update", (req, res) => {
  console.log(req.body);
  res.status(201).send("Zor");
  const { error } = userValidation(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({ msg: error.details[0].message });
  }
});

router.post("/company/create", (req, res) => {
  console.log(req.body);
  res.status(201).send("Zor");
  const { error } = companyValidation(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({ msg: error.details[0].message });
  }
});

router.put("/company/update", (req, res) => {
  console.log(req.body);
  res.status(201).send("Zor");
  const { error } = companyValidation(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({ msg: error.details[0].message });
  }
});
