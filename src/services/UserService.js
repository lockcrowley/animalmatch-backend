const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getUsersService = async () => {
  const users = await User.find();

  if(!users) {
    throw new Error("Users not found");
  }

  return users;
}

exports.editProfileService = async (data, userId) => {
  const { name, email } = data;

  const emailAlreadyExists = await User.find({email});

  if(!emailAlreadyExists) {
    throw new Error("This e-mail is already in use");
  }

  const updateUser = await User.findByIdAndUpdate(userId, {
    name, email
  });
  
  return updateUser;
}

exports.changePasswordService = async (data, userId) => {
  const { currentPassword, newPassword } = data;

  const user = await User.findById(userId);

  const checkPassword = await bcrypt.compare(currentPassword, user.password);

  if(!checkPassword) {
    throw new Error("Incorrect current password");
  }

  if(newPassword < 8) {
    throw new Error("Password must contain at least 6 characters");
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
