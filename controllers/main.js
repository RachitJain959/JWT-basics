const jwt = require("jsonwebtoken");

const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("Please provide username & password", 400);
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
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }

  const token = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new CustomAPIError("Not authorized to access this route", 401);
  }

  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Authorized data, your lucky umber is: ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
