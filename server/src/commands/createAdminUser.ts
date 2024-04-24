import { mongo } from "@cofig/config";
import { UserModel } from "@users/user.model";
import mongoose from "mongoose";
import readline from "readline";

mongoose.connect(mongo.MONGO_CONNECTION, mongo.MONGO_OPTIONS);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const createAdminUser = async () => {
  try {
    // Check if admin user already exists
    const existingUser = await UserModel.findOne({ username: "admin" });
    if (existingUser) {
      console.log("Admin user already exists.");
      return;
    }

    // Prompt user for input
    rl.question("Nhập email: ", async (email) => {
      rl.question("Nhập mật khẩu: ", async (password) => {
        rl.question("Nhập họ: ", async (firstName) => {
          rl.question("Nhập tên: ", async (lastName) => {
            rl.question("Nhập SĐT: ", async (phoneNumber) => {
              // Hash admin password

              // Create admin user
              const adminUser = new UserModel({
                email,
                password,
                firstName,
                lastName,
                phoneNumber,
                isStaff: true,
              });
              // Save admin user to database
              await adminUser.save();

              console.log("Tạo tài khoản admin thành công.");
              rl.close();
              db.close();
            });
          });
        });
      });
    });
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

createAdminUser();
