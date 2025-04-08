const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.get("/", userController.getAllusers);
router.post("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delet("/:id", userController.deleteUser);

module.exports = router;
