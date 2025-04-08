module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      scheduleId: { type: DataTypes.INTEGER },
      amount: { type: DataTypes.DECIMAL(10, 2) },
      status: { type: DataTypes.STRING },
      paidAt: { type: DataTypes.DATE },
    },
    {
      timestamps: true,
      tableName: "Payments",
    }
  );

  return Payment;
};
