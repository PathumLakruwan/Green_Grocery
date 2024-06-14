const userModel = require("../../Models/userModel");
const jwt = require("jsonwebtoken");

async function userLogin(req, res) {
  try {
    const { userName, password } = req.body;

    if (!userName) {
      throw new Error("Please Provide the User Name");
    }

    if (!password) {
      throw new Error("Please Provide the Password");
    }

    const user = await userModel.findOne({ userName });

    if (!user) {
      throw new Error("User Not Found");
    }

    if (password != user.password) {
      throw new Error("Password is Incorrect");
    }

    const tokenData = {
      _id: user._id,
      userName: user.userName,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY);

    const tokenOption = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("token", token, tokenOption).json({
      message: "Login Successfull",
      data: token,
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogin;
