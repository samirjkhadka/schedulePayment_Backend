module.exports = (sequelize, DataTypes) => {
  const Merchant = sequelize.define(
    "Merchant",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      phone: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING },
    },
    {
      timestamps: true,
      tableName: "Merchants",
    }
  );

  return Merchant;
};
