const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

//Base Fake
const users = [
  { id: 1, username: 'teste', password: '12345' }
];


const login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token:token, expiresIn:"1h" });
};

module.exports = {
  login,
};