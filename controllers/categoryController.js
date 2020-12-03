const { Category, Ingredient } = require("../db/models");

//FetchCategorys
exports.fetchCategory = async (categoryId, next) => {
  try {
    const category = await Category.findByPk(categoryId);
    return category;
  } catch (error) {
    next(error);
  }
};
//Create Ingredient
exports.ingredientCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.categoryId = req.category.id;
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (err) {
    next(err);
  }
};
//Create Category
exports.categoryCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
};

//Categories List
exports.categoriesList = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Ingredient,
          as: "ingredients",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

//Delete Category
exports.categoryDelete = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const foundCategory = await Category.findByPk(categoryId);
    if (foundCategory) {
      await foundCategory.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (err) {
    next(err);
  }
};

//Update Category
exports.categoryUpdate = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const foundCategory = await fetchCategory(categoryId, next);
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    if (foundCategory) {
      await foundCategory.update(req.body);
      // for (const key in req.body) foundCategory[key] = req.body[key];
      res.status(204).end();
    } else {
      const err = new Error("Category Not Found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
