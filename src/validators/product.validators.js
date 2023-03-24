const { check, param } = require("express-validator");
const validateResult = require("../utils/validate");


const createProductValidator = [
    check("id").isInt().withMessage("El id debe ser un numero entero"),
    check("name", "Error con el campo name")
        .exists()
        .withMessage("Debe existir la propiedad 'name'")
        .notEmpty()
        .withMessage("El campo name no debe estar vacio")
        .isString()
        .withMessage("El campo name debe ser un string")
        .isLength({ min: 6, max: 30 })
        .withMessage("El campo name debe tener entre 6 y 30 caracteres"),
    check("description", "Error con el campo description")
        .exists()
        .withMessage("Debe existir la propiedad 'description'")
        .notEmpty()
        .withMessage("El campo description no debe estar vacio")
        .isString()
        .withMessage("El campo description debe ser un string")
        .isLength({ min: 6 })
        .withMessage("El campo description debe tener minimo de 6 caracteres"),
    check("price", "Error con el campo price")
        .exists()
        .withMessage("Debe existir la propiedad 'price'")
        .notEmpty()
        .withMessage("El campo price no debe estar vacio")
        .isFloat()
        .withMessage("El campo price debe ser un numero decimal"),
    check("stock").isInt().withMessage("El stick debe ser un numero entero"),
    check("product_image", "Error con el campo product_image")
        .exists()
        .withMessage("Debe existir la propiedad 'product_image'")
        .notEmpty()
        .withMessage("El campo product_image no debe estar vacio")
        .isString()
        .withMessage("El campo product_image debe ser un string"),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

const updateProductValidator = [
    param("id").isInt().withMessage("El id debe ser un numero entero"),
    check("description", "Error con el campo description")
        .exists()
        .withMessage("Debe existir la propiedad 'description'")
        .notEmpty()
        .withMessage("El campo description no debe estar vacio")
        .isString()
        .withMessage("El campo description debe ser un string")
        .isLength({ min: 6 })
        .withMessage("El campo description debe tener minimo de 6 caracteres"),
    check("is_active", "Error con el campo is_active")
        .exists()
        .withMessage("Debe existir la propiedad 'is_active'")
        .notEmpty()
        .withMessage("El campo is_active no debe estar vacio")
        .isBoolean()
        .withMessage("El campo is_active debe ser un boolean"),
    (req, res, next) => {
        validateResult(req, res, next);
    },
]

module.exports = {
    createProductValidator,
    updateProductValidator,
};