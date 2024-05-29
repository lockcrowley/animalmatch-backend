const {
  createUserService,
  userLoginService,
  userLogoutService,
  forgotPasswordService,
  resetPasswordService,
  generateAccessToken
} = require('../services/AuthService');

exports.createUser = async (req, res) => {
  try {
    const data = req.body;

    const create = await createUserService(data);

    return res.status(201).json({ create });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const data = req.body;

    const signIn = await userLoginService(data, res);
    
    return res.status(200).json(signIn);

  } catch (error) {
    console.log(error);
 
    return res.status(400).json({ error: error.message });
  }
};

exports.userLogout = async (req, res) => {
  try {
    await userLogoutService(res);

    return res.status(200).json({ message: "Deslogado com sucesso" });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const data = req.body;

    await forgotPasswordService(data);

    return res.status(200).json("E-mail enviado com sucesso!");

  } catch (error) {
    return res.status(400).json({ error: error.message || error });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const data = req.body;

    await resetPasswordService(data);

    return res.status(200).json("Senha alterada com sucesso!");

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.createToken = async (req, res) => {
  try {
    const token = await generateAccessToken(req);

    return res.status(200).json({ token });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
