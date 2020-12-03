const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
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

  SequelizeSlugify.slugifyModel(Category, {
    source: ["name"],
  });

  return Category;
};
