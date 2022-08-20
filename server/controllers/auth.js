const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ msg: 'Incorrect Username or Password', status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res
        .status(400)
        .json({ msg: 'Incorrect Username or Password', status: false });

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.SECRET_TOKEN_JWT,
      { expiresIn: '4000000s' }
    );

    return res.json({
      status: true,
      accessToken,
    });
  } catch (ex) {
    next(ex);
  }
};
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res
        .status(400)
        .json({ msg: 'Username already used', status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: 'Email already used', status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.SECRET_TOKEN_JWT,
      { expiresIn: '4000000s' }
    );

    return res.json({
      status: true,
      accessToken,
    });
  } catch (ex) {
    next(ex);
  }
};

const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.status(200).json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      'email',
      'username',
      'avatarImage',
      '_id',
    ]);
    console.log(users);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

const myAccount = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.userId }).select([
      'email',
      'username',
      'avatarImage',
      '_id',
    ]);
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { register, login, setAvatar, getAllUsers, myAccount };
