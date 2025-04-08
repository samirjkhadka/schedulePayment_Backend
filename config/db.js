require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    },
    logging: false,
  }
);

//load models
const User = require("../models/user.model")(sequelize, DataTypes);
const Merchant = require("../models/merchant.model")(sequelize, DataTypes);
const Schedule = require("../models/schedule.model")(sequelize, DataTypes);
const Payment = require("../models/payment.model")(sequelize, DataTypes);

// Setup associations
Merchant.hasMany(Schedule, { foreignKey: "merchantId" });
Schedule.belongsTo(Merchant, { foreignKey: "merchantId" });

Schedule.hasMany(Payment, { foreignKey: "scheduleId" });
Payment.belongsTo(Schedule, { foreignKey: "scheduleId" });

// Export everything
const db = {
  sequelize,
  Sequelize,
  User,
  Merchant,
  Schedule,
  Payment,
};

module.exports = sequelize;
