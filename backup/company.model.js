module.exports=(sequelize, Sequelize)=>{
    const Company=sequelize.afterDefine("Company",{
        Name:{
            type: Sequelize.STRING,
            required: true
        },
        email:{
            type: Sequelize.STRING,
        }, 
        phone:{
            type: Sequelize.INTEGER,
        }, 
        website:{
            type: Sequelize.STRING,
        }
    });
    return Company;
}