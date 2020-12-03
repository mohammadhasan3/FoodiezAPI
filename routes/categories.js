const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  categoriesList,
  categoryDelete,
  categoryCreate,
  categoryUpdate,
  fetchCategory,
  ingredientCreate,
} = require("../controllers/categoryController");

router.param("categoryId", async (req, res, next, categoryId) => {
  const category = await fetchCategory(categoryId, next);
  if (category) {
    req.category = category;
    next();
  } else {
    const err = new Error("Category Not Found");
  }
});

//Create Ingredient
router.post(
  "/:categoryId/ingredients",
  upload.single("image"),
  ingredientCreate
);

//Create Category
router.post("/", upload.single("image"), categoryCreate);

//Read Category
router.get("/", categoriesList);

//Delete Category
router.delete("/:categoryId", categoryDelete);

//Update Category
router.put("/:categoryId", upload.single("image"), categoryUpdate);

module.exports = router;
