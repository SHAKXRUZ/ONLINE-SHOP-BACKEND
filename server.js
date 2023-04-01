import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./router/user_router.js";
import companyRouter from "./router/company_routes.js";
import middleware from "./middleware/user_middleware.js";

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(middleware);

app.use("/user", userRouter);
app.use("/company", companyRouter);

app.listen(PORT, () => {
  console.log(PORT);
});
