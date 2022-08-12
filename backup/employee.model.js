const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports=(sequelize, Sequelize)=>{
    const Employee=sequelize.afterDefine("employee",{
        firstName:{
            type: Sequelize.STRING,
            required: true
        },
        lastName:{
            type: Sequelize.STRING,
            required: true
        },
        Company:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        }, 
        phone:{
            type: Sequelize.INTEGER
        }
    })
    return Employee;
}