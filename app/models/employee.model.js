module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
        firstName:{
            type: Sequelize.STRING,
            required: true
        },
        lastName:{
            type: Sequelize.STRING,
            required: true
        },
        Company:{
            type: Sequelize.INTEGER
        },
        email:{
            type: Sequelize.STRING
        }, 
        phone:{
            type: Sequelize.BIGINT
        }
    });
    return Employee;
};
  