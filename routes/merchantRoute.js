const express = require("express");
const router = express.Router();
const MerchantController = require("../controllers/merchantController");

router.get("/", MerchantController.getAll);
router.get("/:id", MerchantController.getById);
router.post("/", MerchantController.create);
router.put("/:id", MerchantController.update);
router.delete("/:id", MerchantController.remove);

module.exports = router;
