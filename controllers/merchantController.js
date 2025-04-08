const { sequelize } = require("../config/db");

// Get all merchants
exports.getAllMerchants = async (req, res) => {
  try {
    const [results] = await sequelize.query("EXEC sp_GetAllMerchants");
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch merchants", error });
  }
};

// Get merchant by ID
exports.getMerchantById = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await sequelize.query("EXEC sp_GetMerchantById :id", {
      replacements: { id },
    });
    res.json(results[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch merchant", error });
  }
};

// Create merchant
exports.createMerchant = async (req, res) => {
  try {
    const { name, contactEmail, contactPhone, status } = req.body;
    await sequelize.query(
      "EXEC sp_CreateMerchant :name, :contactEmail, :contactPhone, :status",
      {
        replacements: { name, contactEmail, contactPhone, status },
      }
    );
    res.status(201).json({ message: "Merchant created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create merchant", error });
  }
};

// Update merchant
exports.updateMerchant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contactEmail, contactPhone, status } = req.body;
    await sequelize.query(
      "EXEC sp_UpdateMerchant :id, :name, :contactEmail, :contactPhone, :status",
      {
        replacements: { id, name, contactEmail, contactPhone, status },
      }
    );
    res.json({ message: "Merchant updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update merchant", error });
  }
};

// Delete merchant
exports.deleteMerchant = async (req, res) => {
  try {
    const { id } = req.params;
    await sequelize.query("EXEC sp_DeleteMerchant :id", {
      replacements: { id },
    });
    res.json({ message: "Merchant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete merchant", error });
  }
};
