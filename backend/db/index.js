const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("wheel", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
 sequelize
   .authenticate()
   .then((r) => console.log("connected"))
   .catch((err) => console.log(err));

   sequelize.sync({ alter: true })
  .then(() => {
     console.log("Database and tables created!");
   })
   .catch((err) => {
     console.error("Error syncing database:", err);
  });
module.exports = sequelize;