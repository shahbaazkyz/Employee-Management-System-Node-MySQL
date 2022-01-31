module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "employee_db",
  dialect: "mysql",
  PORT: 3306,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
