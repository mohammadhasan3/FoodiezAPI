let ingredients = require("../routes/ingredients");
const { Ingredient, Category } = require("../db/models");

//FetchIngredients
exports.fetchIngredient = async (ingredientId, next) => {
  try {
    const ingredient = await Ingredient.findByPk(ingredientId);
    return ingredient;
  } catch (error) {
    next(error);
  }
};

//IngredientsList
exports.ingredientsList = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Category,
        as: "category",
        attributes: ["name"],
      },
    });
    res.json(ingredients);
  } catch (err) {
    next(err);
  }
};

//Delete
exports.ingredientDelete = async (req, res) => {
  const { ingredientId } = req.params;
  try {
    const foundIngredient = await Ingredient.findByPk(ingredientId);
    if (foundIngredient) {
      await foundIngredient.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Ingredient not found" });
    }
  } catch (err) {
    next(err);
  }
};

//Update
exports.ingredientUpdate = async (req, res, next) => {
  const { ingredientId } = req.params;

  try {
    const foundIngredient = await fetchIngredient(ingredientId, next);
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    if (foundIngredient) {
      await foundIngredient.update(req.body);
      // for (const key in req.body) foundIngredient[key] = req.body[key];
      res.status(204).end();
    } else {
      const err = new Error("Ingredient Not Found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
