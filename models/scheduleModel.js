module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      merchantId: { type: DataTypes.INTEGER },
      title: { type: DataTypes.STRING },
      description: { type: DataTypes.TEXT },
      frequency: { type: DataTypes.STRING },
      startDate: { type: DataTypes.DATE },
      endDate: { type: DataTypes.DATE },
      status: { type: DataTypes.STRING },
    },
    {
      timestamps: true,
      tableName: "Schedules",
    }
  );

  return Schedule;
};
