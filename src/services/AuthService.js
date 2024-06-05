const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../utils/nodemailer');
const { resetPasswordTemplate } = require('../utils/emailTemplate');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, JWT_RESET } = process.env;

exports.createUserService = async (data) => {
  const { 
    name, 
    email, 
    password, 
    phone,
    residence,
    wantToAdopt,
    street, 
    city, 
    state, 
    zipCode, 
    country,
    description,
    hashtags
  } = data;
  
  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new Error("Este usuário já existe!")
  }

  const passwordHash = await bcrypt.hash(password, 10);

  return await User.create({
    name, 
    email, 
    password: passwordHash,
    phone,
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
    hashtags
  });
};

exports.userLoginService = async (data, res) => {
  const { email, password } = data;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("E-mail ou senha incorreta");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("E-mail ou senha incorreta");
  }

  const accessToken = createAccessToken({ id: user._id });
  const refreshToken = createRefreshToken({ id: user._id });

  res.cookie('refreshtoken', refreshToken, {
    httpOnly: true,
    path: '/api/auth/refresh_token',
    maxAge: 30 * 24 * 60 * 1000
  });

  const infoLogin = ({ accessToken, user });

  return infoLogin;
};

exports.userLogoutService = async (res) => {
  res.clearCookie('refreshtoken', { path: '/api/auth/refresh_token' })
};

exports.forgotPasswordService = async (data) => {
  try {
    const { email } = data;
  
    const userExists = await User.findOne({ email });
  
    if (!userExists) {
      throw new Error("E-mail não encontrado")
    }
  
    const token = jwt.sign({ id: userExists._id }, JWT_RESET, {
      expiresIn: '20m'
    });
  
    const { name } = userExists;
  
    const dataUser = await resetPasswordTemplate(email, name, token);
  
    await User.findOneAndUpdate({ email }, { resetToken: token });
  
    return await transporter.sendMail(dataUser)
  } catch (err) {
    throw new Error(err)
  }
};

exports.resetPasswordService = async (data, res) => {
  try {
    const { resetToken, password } = data;

    const tryToken = jwt.verify(resetToken, JWT_RESET);

    if (tryToken) {

      const user = await User.findOne({ resetToken });
      
      if (user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatePassword = await User.findOneAndUpdate(
          { resetToken },
          { password: hashedPassword, resetToken: "" },
        );
        return updatePassword;
      } else {
        throw new Error("Usuário não encontrado")
      }
    }
  } catch (err) {
    throw new Error("Invalid Token");
  }
};

exports.generateAccessToken = async (req) => {
  const rf_token = req.cookies.refreshToken;

  if (!rf_token) {
    throw new Error("Você precisa estar logado!");
  }

  jwt.verify(rf_token, REFRESH_TOKEN_SECRET, async (err, result) => {
    if (err) {
      throw new Error("Você precisa estar logado!");
    }
    const user = await User.findById(result.id).select('-password');

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const access_token = createAccessToken({ id: result.id });

    const info = ({ access_token, user });

    return info;
  });
};

  const createAccessToken = (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
  };

  const createRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
  };
