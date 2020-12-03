const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define("Recipe", {
    name: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
    },

    description: {
      type: DataTypes.TEXT,
    },

    difficulty: {
      type: DataTypes.INTEGER,
    },

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  SequelizeSlugify.slugifyModel(Recipe, {
    source: ["name"],
  });
  return Recipe;
};
