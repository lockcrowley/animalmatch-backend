const User = require("../models/User");
const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET } = process.env;

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')

    if(!token) return res.status(400).json({error: "Você precisa estar logado!"});

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

    if(!decoded) return res.status(400).json({error: "Você precisa estar logado!"});
  
    const user = await User.findOne({_id: decoded.id});

    if (!user) return res.status(400).json({error: "Você precisa estar logado!"});

    req.user = user;
    next();
  }catch(error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = auth;
