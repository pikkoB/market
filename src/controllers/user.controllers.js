const Users = require("../models/users.models");
const AuthServices = require("../services/auth.services");
const UsersServices = require("../services/user.services");
const transporter = require("../utils/mailer")

const createUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    console.log(newUser);
    const user = await UsersServices.create(newUser);
    if (user) {
      await transporter.sendMail({
        from: process.env.MAILER_CONFIG_USER,
        to: user.email,
        subject: "Bienvenido a MarketPlace.com",
        html: `
        <h1 style= "color: red"> Hola! ${username} bienvenido a supermarket.com.</h1>
        <hr>
        <p> Donde comprar y vender esta a un solo click </p>
        <br></br>
        <hr><hr><hr>
        <p>Es hora de que comiences a cargar tus productos y ver lo facil que es</p>`,

      });
    }


    res.status(201).json({
      success: true
    });

  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await UsersServices.update(id, {avatar: req.file?.path});

    res.status(201).json({success: true});
  } catch (error) {
    next(error)
  }
};






module.exports = {
  createUser,
  updateUser,

};
