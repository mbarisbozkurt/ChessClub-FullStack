import mongoose from "mongoose";
import bcrypt from "bcryptjs"; 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  }
}, 
{
  timestamps: true,
})

//compare the entered password (plaintext, string) with the password in the database (hashed password)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); //this.password = password in the database (hashed)
}

//Create the User table
const User = mongoose.model("User", userSchema);

export default User;