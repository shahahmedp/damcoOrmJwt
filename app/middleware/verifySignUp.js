const { ROLES } = require("../models");
const db= require("../models");
const Roles= db.ROLES;
const User= db.user;

checkDataRequest= (req, res, next)=>{
  if(!req.body.role){
    res.status(404).send({
      message:"Enter the all contents",
      dataFormat:{
        "username": "String",
        "email": "String",
        "password": "password",
        "roles": ["Employee", "admin"]
    }
  });
  return;
  }
  next();
}
checkDuplicatUsernameOrEmail=async (req, res, next)=>{
    //username
    User.findOne({
        where:{username: req.body.username}
    }).then(user=>{
        if(user){
            res.status(400).send({
                message:"Failed Username is already in use!"
            });
            return;
        }
        User.findone({
            where:{
                email: req.body.emails
            }
        }).then(user =>{
            if(user){
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }
            next();
        })
    })
}
checkDuplicatUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Username is already in use!"
        });
        return;
      }
  
      // Email
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Email is already in use!"
          });
          return;
        }
  
        next();
      });
    });
  };
checkRolesExisted = (req, res, next) =>{
    if(req.body.roles){
        for(let i=0;i<req.body.roles.length;i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: "Failed roles does not exist="+ req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
}


const verifysignUp={
    checkDuplicatUsernameOrEmail: checkDuplicatUsernameOrEmail,
    checkRolesExisted: checkRolesExisted,
    checkDataRequest:checkDataRequest
};
module.exports = verifysignUp;