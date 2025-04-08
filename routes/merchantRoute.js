const express = require("express");
const router = express.Router();
const merchantController = require("../controllers/merchant.controller");
const authMiddleware = require("../middlewares/auth");

// Protect all merchant routes
router.use(authMiddleware.verifyToken);

// GET all merchants
router.get("/", merchantController.getAllMerchants);

// GET merchant by ID
router.get("/:id", merchantController.getMerchantById);

// CREATE new merchant
router.post("/", merchantController.createMerchant);

// UPDATE merchant
router.put("/:id", merchantController.updateMerchant);

// DELETE merchant
router.delete("/:id", merchantController.deleteMerchant);

module.exports = router;
