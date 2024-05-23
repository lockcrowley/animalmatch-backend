exports.validRegister = async (req, res, next) => {
  const { name, email, password } = req.body;

  const errors = [];

  if (!name) {
      errors.push("The name field is mandatory.");
  } else if (name.length > 30) {
      errors.push("Your name is too long.");
  }

  if (!email) {
      errors.push("The email field is mandatory.");
  }

  if (password.length < 8) {
      errors.push("Password must contain at least 8 characters.");
  }

  if (errors.length > 0) return res.status(400).json({ error: errors })
  next();
};

exports.validPost = async (req, res, next) => {
  const { title, description } = req.body

  const errors = [];

  if (!title) {
      errors.push("Título é obrigatório.");
  } else if (title.length > 100) {
      errors.push("Seu título é muito longo.");
  }

  if (!description) {
      errors.push("Descrição é obrigatório.");
  }

  if (errors.length > 0) return res.status(400).json({ error: errors })
  next();
};