const { sequelize } = require("../config/db");

// Get all schedules
exports.getAllSchedules = async (req, res) => {
  try {
    const [results] = await sequelize.query("EXEC sp_GetAllSchedules");
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch schedules", error });
  }
};

// Get schedule by ID
exports.getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await sequelize.query("EXEC sp_GetScheduleById :id", {
      replacements: { id },
    });
    res.json(results[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch schedule", error });
  }
};

// Create schedule
exports.createSchedule = async (req, res) => {
  try {
    const {
      merchantId,
      title,
      amount,
      frequency,
      startDate,
      endDate,
      status,
    } = req.body;

    await sequelize.query(
      "EXEC sp_CreateSchedule :merchantId, :title, :amount, :frequency, :startDate, :endDate, :status",
      {
        replacements: {
          merchantId,
          title,
          amount,
          frequency,
          startDate,
          endDate,
          status,
        },
      }
    );

    res.status(201).json({ message: "Schedule created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create schedule", error });
  }
};

// Update schedule
exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      merchantId,
      title,
      amount,
      frequency,
      startDate,
      endDate,
      status,
    } = req.body;

    await sequelize.query(
      "EXEC sp_UpdateSchedule :id, :merchantId, :title, :amount, :frequency, :startDate, :endDate, :status",
      {
        replacements: {
          id,
          merchantId,
          title,
          amount,
          frequency,
          startDate,
          endDate,
          status,
        },
      }
    );

    res.json({ message: "Schedule updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update schedule", error });
  }
};

// Delete schedule
exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    await sequelize.query("EXEC sp_DeleteSchedule :id", {
      replacements: { id },
    });
    res.json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete schedule", error });
  }
};
