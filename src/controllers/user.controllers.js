const AuthServices = require("../services/auth.services");
const UsersServices = require("../services/user.services");

const createUser = async (req, res) => {
  try {
    const newUser = req.body;

    await UsersServices.create(newUser);

    res.status(201).json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // const { name, lastname } = req.body;
    await UsersServices.update(id, req.body);
    res.status(204).send({
      success: true
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createUser,
  updateUser,
};

    // const { id, email, username } = result;
    // const token = await AuthServices.genToken({
    //   id,
    //   email,
    //   username,
    // });
    // await transporter.sendMail({
    //   from: "marco2616@gmail.com",
    //   to: result.email,
    //   subject: "Verifica tu correo electronico",
    //   html: `
    //     <p>Hola ${result.username} Bienvenido al foro</p>
    //     <p> Es necesario que verifiques tu correo </p>
    //     <a href="http://localhost:5173/verify?token=${token}" target="_blank"> validar correo </a>
    //   `,
    // });