module.exports = (sequelize, DataTypes) => {
  const RecipeIngredients = sequelize.define("RecipeIngredients", {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Recipe",
        key: "id",
      },
    },

    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Ingredient",
        key: "id",
      },
    },
  });
  return RecipeIngredients;
};
