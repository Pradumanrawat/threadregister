const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv")
dotenv.config();
const User = require("./models/user");
const dumbydata = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const users = [
      {
        companyName: "Beta_Company1",
        ownerName: "John Doe",
        ownerNumber: 9876543210,
        plotNumber: 101,
        sector: 5,
        gstNumber: "AQWSZX1234ESGHY",
        address: "123 Industrial Zone, City",
        password: "Password123"
      },
      {
        companyName: "Beta_Company2",
        ownerName: "Jane Smith",
        ownerNumber: 9123456789,
        plotNumber: 202,
        sector: 8,
        gstNumber: "123WQA34SW4W6TD",
        address: "456 Trade Park, City",
        password: "SecurePass456"
      },
    ];

    await User.insertMany(users);
    console.log("Pre-made accounts  made  successfully");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error   during made users:", error);
    mongoose.disconnect();
  }
};
dumbydata();

