const UserModel = require("../../models/user.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccesToken = (username, _id, name, lastName) => {
  const auth = { username, _id, name, lastName };
  var token = jwt.sign(auth, process.env.JWT_APIKEY, { expiresIn: "1d" });
  return token;
};

const SignUp = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      name,
      lastName,
      identificationType,
      identificationNumber,
      age,
      gender,
      birthDay,
    } = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const body = {
      username,
      password: hash,
      email: email || "",
      name: name || "",
      lastName: lastName || "",
      identificationType: identificationType || "",
      identificationNumber: identificationNumber || 0,
      age: age || 0,
      gender: gender || "",
      birthDay: birthDay || new Date(),
    };

    Register(body, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const Register = async (body, res) => {
  const find = await UserModel.findOne({ username: body.username });
  if (find)
    return res
      .status(401)
      .send({ message: "User already exists", status: false });
  try {
    const createUser = new UserModel(body);
    await createUser.save();
    res.status(200).send({
      message: "User created",
      status: true,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const SignIn = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await UserModel.findOne({ username: userName });

    if (!user) {
      console.log("error en el login", user, userName);
      return res.status(404).send({ message: "User not found", status: false });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .send({ message: "Invalid credentials", status: false });
    }

    const { username, _id, name, lastName } = user;
    const accesToken = generateAccesToken(username, _id, name, lastName);

    return res.status(200).send({
      message: "Authenticated user",
      token: accesToken,
      status: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error", status: false });
  }
};

module.exports = { SignUp, SignIn };
