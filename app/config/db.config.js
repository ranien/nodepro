
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "ranisql@2023",
    DB: "train_tick",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };