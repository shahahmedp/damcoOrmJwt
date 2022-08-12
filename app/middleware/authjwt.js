const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
verifyToken = (req,res,next)=>{
    let token = req.headers["x-access-token"];
    console.log('verify-token-----------------------------------------',token)
    if(!token){
        return res.status(403).send({
            message: "no token provided!"
        });
    }
    jwt.verify(token, config.secret, (err, decoded)=>{
        //console.log('verify-token-----------------------------------------',decoded, err)
        if(err){
            return res.status(401).send({
                message: "Unauthorized"
            });
            
        }
        req.userId=decoded.id;
        next();
    })
};
isAdmin=(req, res, next)=>{
    User.findByPk(req.userId).then(user=>{
        user.getRoles().then(roles =>{
            for(let i=0; i<roles.length; i++){
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require admin Roles!"
            });
            return;
        });
    });
};
// isCompany=(req, res, next)=>{
//     User.findByPk(req.userId).then(user=>{
//         user.getRoles().then(roles =>{
//             for(let i=0; i<roles.length; i++){
//                 if(roles[i].name === "company"){
//                     next();
//                     return;
//                 }
//             }
//             res.status(403).send({
//                 message: "Require company Roles!"
//             });
//             return;
//         });
//     });
// };
isCompany=(req, res, next)=>{
    User.findByPk(req.userId).then(user=>{
        user.getRoles().then(roles =>{
            for(let i=0; i<roles.length; i++){
                if(roles[i].name === "Company"){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require company Roles!"
            });
        });
    });
};
isEmployee=(req, res, next)=>{
    User.findByPk(req.userId).then(user=>{
        user.getRoles().then(roles =>{
            for(let i=0; i<roles.length; i++){
                if(roles[i].name === "Employee"){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Employee Roles!"
            });
        });
    });
};
isEmployeeOrAdmin=(req, res, next)=>{
    User.findByPk(req.userId).then(user=>{
        user.getRoles().then(roles =>{
            for(let i=0; i<roles.length; i++){
                if(roles[i].name === "Employee"){
                    next();
                    return;
                }
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Employee Roles!"
            });
        });
    });
};


const authJwt={
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isCompany: isCompany,
    isEmployee: isEmployee,
    isEmployeeOrAdmin: isEmployeeOrAdmin
};
module.exports = authJwt;