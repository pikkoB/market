const ProductsServices = require("../services/products.services");

const getAllProducts = async (req, res, next) => {

  try {
    const { offset, limit } = req.query;
    const posts = await ProductsServices.getAll(categoryId, offset, limit);
    const { count, rows } = posts;

    const url = "localhost:8000/api/v1/products";

    const newOffset = (isNext) => {
      if (isNext) return Number(offset) + Number(limit);

      return Number(offset) - Number(limit);
    };

    const nextPage =
      newOffset(true) >= count
        ? null
        : `${url}?offset=${newOffset(true)}&limit=${limit}`;

    const previousPage =
      +offset > 0 ? `${url}?offset=${newOffset(false)}&limit=${limit}` : null;

    const response = {
      count,
      next: nextPage,
      previous: previousPage,
      posts: rows,
    };

    res.json(!limit && !offset ? response.posts : response);
  } catch (error) {
    next(error);
  }
};


const createProduct = async (req, res, next) => {
  try {
    const {id} = req.user;
    if (id != req.body.user_id) {
      return next({
        status: 401,
        message: "Unauthorized",
        errorName: "user not logged in",
      });
    }
    await ProductsServices.create(req.body);
    res.status(201).json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    await ProductsServices.update(newData, id);
    res.status(204).send({
      success: true
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
};
