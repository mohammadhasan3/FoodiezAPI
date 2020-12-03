const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define("Ingredient", {
    name: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
    },

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  SequelizeSlugify.slugifyModel(Ingredient, {
    source: ["name"],
  });
  return Ingredient;
};
