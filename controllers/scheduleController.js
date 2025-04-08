const db = require("../config/db");

exports.getAllSchedules = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Schedules");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: "Error fetching schedules", error: err });
  }
};

exports.getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM Schedules WHERE id = @id", {
      id: { type: db.sql.Int, value: id },
    });
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: "Error fetching schedule", error: err });
  }
};

exports.createSchedule = async (req, res) => {
  try {
    const { merchantId, amount, frequency, nextRun, status } = req.body;
    await db.query(
      `INSERT INTO Schedules (merchantId, amount, frequency, nextRun, status)
       VALUES (@merchantId, @amount, @frequency, @nextRun, @status)`,
      {
        merchantId: { type: db.sql.Int, value: merchantId },
        amount: { type: db.sql.Decimal(10, 2), value: amount },
        frequency: { type: db.sql.VarChar(50), value: frequency },
        nextRun: { type: db.sql.DateTime, value: nextRun },
        status: { type: db.sql.VarChar(20), value: status },
      }
    );
    res.status(201).json({ message: "Schedule created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating schedule", error: err });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { merchantId, amount, frequency, nextRun, status } = req.body;
    await db.query(
      `UPDATE Schedules SET 
        merchantId = @merchantId,
        amount = @amount,
        frequency = @frequency,
        nextRun = @nextRun,
        status = @status
      WHERE id = @id`,
      {
        id: { type: db.sql.Int, value: id },
        merchantId: { type: db.sql.Int, value: merchantId },
        amount: { type: db.sql.Decimal(10, 2), value: amount },
        frequency: { type: db.sql.VarChar(50), value: frequency },
        nextRun: { type: db.sql.DateTime, value: nextRun },
        status: { type: db.sql.VarChar(20), value: status },
      }
    );
    res.json({ message: "Schedule updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating schedule", error: err });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM Schedules WHERE id = @id", {
      id: { type: db.sql.Int, value: id },
    });
    res.json({ message: "Schedule deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting schedule", error: err });
  }
};
