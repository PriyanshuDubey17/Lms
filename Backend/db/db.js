require("dotenv").config();
const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    data = await mongoose.connect(process.env.MONGO_URL || 5000);
    console.log("database connected successfully ", data.connection.host);
  } catch (error) {
    console.log("database not connected successfully ", error);
    process.exit(1);
  }
};

module.exports = dbConnect;

// mongoose.connect(process.env.MONGO_URL="mongodb+srv://priyanshu:priyanshu@firstdatabase.btnjfsn.mongodb.net/?retryWrites=true&w=majority&appName=firstDataBase/MyFirstDatabase"
// ).then(()=>{
//     console.log("mongoose connect")
// }).catch(()=>{
//     console.log("mongoose  not connect")
// })
