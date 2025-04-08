const app = require("./app");
const sequelize = require("./config/db");

const PORT = process.env.PORT || 5000;

sequelize
  .sync({ force: false }) // or { force: true } during dev
  .then(() => {
    console.log("✅ Database synced");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Sync Error:", err);
  });
