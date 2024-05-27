const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getUsersService = async () => {
  const users = await User.find();

  if(!users) {
    throw new Error("Users not found");
  }

  return users;
}

exports.getUserByEmailService = async (data) => {
  const user = await User.find({ email: data.email });

  if(!user) {
    throw new Error("User not found");
  }

  return user;
}

exports.editProfileService = async (data, userId) => {
  const { 
    name, 
    email, 
    street, 
    city, 
    state, 
    zipCode, 
    country,
    description,
    hashtags
   } = data;

  const emailAlreadyExists = await User.find({email});

  if(!emailAlreadyExists) {
    throw new Error("This e-mail is already in use");
  }

  return await User.findByIdAndUpdate(userId, {
    name, 
    email,
    street, 
    city, 
    state, 
    zipCode, 
    country,
    description,
    hashtags
  });
}

exports.changePasswordService = async (data, userId) => {
  const { currentPassword, newPassword, confirmPassword } = data;

  const user = await User.findById(userId);

  const checkPassword = await bcrypt.compare(currentPassword, user.password);

  if(!checkPassword) {
    throw new Error("Incorrect current password");
  }

  const checkPasswordEquals = newPassword === confirmPassword;

  if (!checkPasswordEquals) {
    throw new Error("Password and confirmation password must be the sames");
  }

  if(newPassword < 8) {
    throw new Error("Password must contain at least 8 characters");
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 10);

  const newPassw = await User.findByIdAndUpdate(userId, {
    password: newPasswordHash
  });

  return newPassw;
}

exports.deleteUserService = async (userId) => {
  const deleteUser = await User.findByIdAndDelete(userId);

  return deleteUser;
};
