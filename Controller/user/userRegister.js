const { hashPassword } = require("../../helpers/auth");
const userModel = require("../../Models/userModel");

async function userRegister(req, res) {
  try {
    const { name, userName, email, password } = req.body;
    console.log("req.body", req.body);

    if (!name) {
      throw new Error("Please Provide the Name ");
    }

    if (!userName) {
      throw new Error("Please Provide the UserName");
    }

    if (!email) {
      throw new Error("Please Provide the Correct Email");
    }

    if (!password) {
      throw new Error("Please Provide the Correct Password");
    }
    //const hashPassword = await hashPassword(password);

    const payLoad = {
      ...req.body,
      //password:hashPassword,
      role: "GENERAL",
    };

    await new userModel(payLoad).save();

    res.status(201).json({
      data: payLoad,
      sucess: true,
      error: false,
      message: "User Created Successfully! ",
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      sucess: false,
    });
  }
}

module.exports = userRegister;
