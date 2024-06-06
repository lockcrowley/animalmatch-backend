const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getUsersService = async () => {
  const users = await User.find();

  if(!users || !users.length) {
    throw new Error("Usuários não encontrados");
  }

  return users;
}

exports.getUserByEmailService = async (data) => {
  const user = await User.find({ email: data.email });

  if(!user || !user.length) {
    throw new Error("Usuário não encontrado");
  }

  return user;
}

exports.editProfileService = async (data, userId) => {
  const { 
    name, 
    email,
    password,
    currentPassword, 
    residence,
    wantToAdopt,
    street, 
    city, 
    state, 
    zipCode, 
    country,
    description,
    hashtags,
    image
   } = data;

  const emailAlreadyExists = await User.findOne({ email });

  if(!emailAlreadyExists) {
    throw new Error("Este e-mail já está em uso");
  }

  const user = await User.findById(userId);

  const checkPassword = await bcrypt.compare(currentPassword, user.password);

  if(!checkPassword) {
    throw new Error("Senha atual incorreta");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  return await User.findByIdAndUpdate(userId, {
    name, 
    password: passwordHash,
    email,
    residence,
    wantToAdopt,
    address: {
      street, 
      city, 
      state, 
      zipCode, 
      country,
    },
    description,
    hashtags,
    image
  });
}

exports.changePasswordService = async (data, userId) => {
  const { currentPassword, newPassword, confirmPassword } = data;

  const user = await User.findById(userId);

  const checkPassword = await bcrypt.compare(currentPassword, user.password);

  if(!checkPassword) {
    throw new Error("Senha atual incorreta");
  }

  const checkPasswordEquals = newPassword === confirmPassword;

  if (!checkPasswordEquals) {
    throw new Error("A senha e confirmação precisam ser iguais");
  }

  if(newPassword < 8) {
    throw new Error("A senha deve ter pelo menos 8 caracteres.");
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 10);

  const newPassw = await User.findByIdAndUpdate(userId, {
    password: newPasswordHash
  });

  return newPassw;
}

exports.deleteUserService = async (userId) => {
  return await User.findByIdAndDelete(userId);
};
