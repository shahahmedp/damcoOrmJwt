module.exports={
    HOST:"localhost",
    User: "postgres",
    PASSWORD: "shah@123",
    DB:"meta",
    PORT: 5432,
    dialect: "postgres",
    pool: {
        max: 10,
        min: 5,
        acquire: 30000,
        idle: 10000
      }
}