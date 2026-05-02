const express = require("express");
const dotenv = require("dotenv");
const cors=require("cors");
dotenv.config();
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
const authRouter=require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const shopRouter = require("./routes/shopRoutes");
const itemRouter = require("./routes/itemRoutes");
const app = express();
const port = process.env.PORT ;
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/shop",shopRouter);
app.use("/api/item",itemRouter);

app.listen(port, () => {
  connectDb();
  console.log(`server started at ${port}`);
});