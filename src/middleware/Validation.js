exports.validRegister = async (req, res, next) => {
  const { 
    name, 
    email, 
    password, 
    street, 
    city, 
    state, 
    zipCode, 
    country
  } = req.body;

  const errors = [];

  if (!name) {
      errors.push("O nome é obrigatório.");
  } else if (name.length > 50) {
      errors.push("O campo nome é muito longo.");
  }

  if (!email) errors.push("O e-mail é obrigatório.");
  
  if (!street) errors.push("A rua é obrigatória.");

  if (!city) errors.push("A cidade é obrigatória.");

  if (!state) errors.push("O estado é obrigatório.");

  if (!country) errors.push("O país é obrigatório.");

  if (!zipCode) errors.push("O CEP é obrigatório.");

  if (!isValidEmail(email)) errors.push("O e-mail é inválido");

  if (password.length < 8) errors.push("A senha deve ter pelo menos 8 caracteres.");

  if (!password) errors.push("A senha é obrigatória.");

  if (errors.length > 0) return res.status(400).json({ error: errors })

  next();
};

exports.validAnimal = async (req, res, next) => {
  const { name, type, race, age } = req.body

  const errors = [];

  if (!name) {
      errors.push("O nome é obrigatório.");
  } else if (name.length > 30) {
      errors.push("O campo nome é muito longo.");
  }

  if (!type) {
      errors.push("O tipo é obrigatório.");
  } else if (type.length > 30) {
    errors.push("O campo tipo é muito longo.");
  }

  if (!race) {
    errors.push("O tipo é obrigatório.");
  } else if (race.length > 30) {
    errors.push("O campo tipo é muito longo.");
  }

  if (!age) {
    errors.push("A idade é obrigatória.");
  } else if (age.length > 30) {
    errors.push("O campo idade é muito longo.");
  }

  if (errors.length > 0) return res.status(400).json({ error: errors })
  next();
};

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}