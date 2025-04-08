const db = require("../config/db");
const { sql } = db;

const MerchantController = {
  getAll: async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM merchant");
      res.status(200).json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await db.query("SELECT * FROM Merchants WHERE id = @id", {
        id: { type: sql.Int, value: id },
      });
      res.status(200).json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { name, contact } = req.body;
      await db.query(
        "INSERT INTO Merchants (name, contact) VALUES (@name, @contact)",
        {
          name: { type: sql.VarChar, value: name },
          contact: { type: sql.VarChar, value: contact },
        }
      );
      res.status(201).json({ message: "Merchant created" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, contact } = req.body;
      await db.query(
        "UPDATE Merchants SET name = @name, contact = @contact WHERE id = @id",
        {
          id: { type: sql.Int, value: id },
          name: { type: sql.VarChar, value: name },
          contact: { type: sql.VarChar, value: contact },
        }
      );
      res.status(200).json({ message: "Merchant updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM Merchants WHERE id = @id", {
        id: { type: sql.Int, value: id },
      });
      res.status(200).json({ message: "Merchant deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = MerchantController;
