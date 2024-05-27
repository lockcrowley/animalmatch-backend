const { 
  getUsersService,
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

    const userByEmail = await getUsersService(data);

    return res.status(200).json({ userByEmail });

  } catch (error) {
    return res.status(404).json({ error: error.message });
  }   
};

exports.editProfile = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user._id;

    await editProfileService(data, userId);

    return res.status(200).json({message: "User updated"});
       
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user._id;

    await changePasswordService(data, userId);

    return res.status(200).json({message: "Password updated"});
    
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;

    await deleteUserService(userId);

    return res.status(200).json({message: "User successfully deleted"});

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

