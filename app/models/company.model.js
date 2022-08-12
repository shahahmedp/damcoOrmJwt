module.exports=(sequelize, Sequelize)=>{
    const Company=sequelize.define("company",{
        name:{
            type: Sequelize.STRING,
            required: true
        },
        email:{
            type: Sequelize.STRING,
        }, 
        phone:{
            type: Sequelize.BIGINT,
        }, 
        website:{
            type: Sequelize.STRING,
        }
    });
    return Company;
}