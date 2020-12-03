const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  ingredientsList,
  ingredientDelete,
  ingredientUpdate,
  fetchIngredient,
} = require("../controllers/ingredientController");

router.param("ingredientId", async (req, res, next, ingredientId) => {
  const ingredient = await fetchIngredient(ingredientId, next);
  if (ingredient) {
    req.ingredient = ingredient;
    next();
  } else {
    const err = new Error("Ingredient Not Found");
  }
});

//Read Ingredient
router.get("/", ingredientsList);

//Delete Ingredient
router.delete("/:ingredientId", ingredientDelete);

//Update Ingredient
router.put("/:ingredientId", upload.single("image"), ingredientUpdate);

module.exports = router;
