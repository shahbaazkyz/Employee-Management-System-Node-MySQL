const dbConfig = require("../config/dbConfig");
const designation = require("./designationModel");
const employee = require("./employeeModel");
const mysql = require("mysql2/promise");
const { Sequelize, DataTypes } = require("sequelize");
const chalk = require("chalk");

const { HOST, USER, PASSWORD, DB, dialect } = dbConfig;
const initialize = async () => {
  const connection = await mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB}`);
};

initialize();

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() =>
    console.log(chalk.green("Connection has been established successfully."))
  )
  .catch((err) => console.log("error " + err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.designations = designation(sequelize, DataTypes);
db.employees = employee(sequelize, DataTypes);

//* Single employee , single designation
db.employees.belongsTo(db.designations, {
  foreignKey: "designationName",
  targetKey: "name",
  as: "designation",
});

db.sequelize.sync({ force: false }).then(() => {
  console.log(chalk.green("Database & tables created!"));
});

module.exports = db;
