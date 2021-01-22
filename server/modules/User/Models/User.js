import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import statuses from 'http-status-codes';
import ErrorResponse from "../../../common/utils/errorResponse.js";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },

  img: {
    type: String,
  },
  roleId:{
    type: String,
  }
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    return next(new ErrorResponse('incorrect password', statuses.NOT_FOUND));
  }
  return next(new ErrorResponse('incorrect email', statuses.NOT_FOUND));
};

// Sign jwt
userSchema.methods.generateJWT = function() {
  return jwt.sign({ _id: this._id }, 'Ahmed', {
    algorithm: 'HS256',
    expiresIn: '14d'
  });
};

userSchema.methods.toAuthJSON = function() {
  return {
    id: this._id,
    roleId: this.roleId,
    email: this.email,
    token: `Bearer ${this.generateJWT()}`
  };
};

const User = mongoose.model("user", userSchema);

export default User;
