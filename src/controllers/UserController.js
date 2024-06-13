const { 
  getUsersService,
  getUserByEmailService,
  getUserByIdService,
  editProfileService,
  changePasswordService,
  deleteUserService
 } = require('../services/UserService');

exports.getUsers = async (req, res) => {
  try {
    const allUsers = await getUsersService();

    return res.status(200).json({allUsers});

  } catch (error) {
    return res.status(404).json({ error: error.message });
  }   
};

exports.getUserByEmail = async (req, res) => {
  try {
    const data = req.body;

    const userByEmail = await getUserByEmailService(data);

    return res.status(200).json({ userByEmail });

  } catch (error) {
    return res.status(404).json({ error: error.message });
  }   
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await getUserByIdService(userId);

    return res.status(200).json({ user });

  } catch (error) {
    return res.status(404).json({ error: error.message });
  }   
};

exports.editProfile = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user._id;

    const updatedUser = await editProfileService(data, userId);

    return res.status(200).json({ user: updatedUser });
       
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user._id;

    await changePasswordService(data, userId);

    return res.status(200).json({message: "Senha atualizada!"});
    
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;

    await deleteUserService(userId);

    return res.status(200).json({message: "Usuário deletado!"});

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

