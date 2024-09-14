const jwt = require("jsonwebtoken");

const { BadRequest } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequest("Please provide username & password");
  }

  // just for demo, usually provided by DB!!!
  const id = new Date().getDate();

  // try to keep small, better UX
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);

  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Authorized data, your lucky umber is: ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
