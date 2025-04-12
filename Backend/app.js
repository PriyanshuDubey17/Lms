const express = require("express");
const dbConnect= require("./db/db")
const app = express();
const userRouter = require("./routes/userRoutes") 
const courseRouter= require("./routes/courseRoutes")
const videoRouter= require("./routes/videoRoutes")
const errorHandler =require("./middleware/errorHandler")
const fileUpload = require("express-fileupload");
const cors = require("cors")

// Allow all origins (development ke liye theek hai)
app.use(cors());

// Or, specific origin allow karna ho:
// app.use(cors({
//   origin: "http://localhost:3000", // frontend ka origin
//   credentials: true, // agar cookies bhi bhejni ho
// }));

dbConnect();

app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/video",videoRouter);
app.use(errorHandler)


module.exports= app;