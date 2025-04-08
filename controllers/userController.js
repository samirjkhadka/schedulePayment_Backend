const { sequelize } = require("../config/db");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [results] = await sequelize.query("EXEC sp_GetAllUsers");
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await sequelize.query("EXEC sp_GetUserById :id", {
      replacements: { id },
    });
    res.json(results[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};

// Create user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    await sequelize.query(
      "EXEC sp_CreateUser :name, :email, :password, :role",
      { replacements: { name, email, password, role } }
    );
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;
    await sequelize.query(
      "EXEC sp_UpdateUser :id, :name, :email, :role",
      { replacements: { id, name, email, role } }
    );
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await sequelize.query("EXEC sp_DeleteUser :id", { replacements: { id } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};
