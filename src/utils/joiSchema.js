const Joi = require("joi");
module.exports = {
  CreateProductsSchema: Joi.object({
    product: Joi.string().required(),
    typeOfLiquor: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    stockItems: Joi.number().required(),
    codeItem: Joi.number().required(),
  }),
};
