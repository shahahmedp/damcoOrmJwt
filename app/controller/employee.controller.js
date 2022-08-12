const db = require("../models");
const employee = db.employee;
const Op = db.Sequelize.Op;
exports.employeeBoard=(req, res)=>{res.status(200).send("employee  Content")};
exports.employeePost=(req, res)=>{
    //doing post operation
    // if(!req.body.name || !req.body.email || !req.body.phone || !req.body.website){
    //     res.status(404).send("Enter all the contents")
    // }
    employee.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        Company:req.body.website.Company,
        email:req.body.email,
        phone:req.body.phone
    }).then(employee=>{
        //console.log('----------------------------employee',employee);
        res.status(200).send({
            message:"employee Detailes added",
            response: employee.data
    })
    }).catch(err=>{
        res.status(500).send({
            message:err.message||"Some error occured while creating the Tutorial ."
        })
    })
};
exports.employeeGet=(req, res)=>{
    employee.findAll().then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            messagge : err.message|| "server error"
        })
    })
} 
exports.employeeGetById=(req, res)=>{
    employee.findByPk(req.params.id).then(data=>{
        if(data){
            res.send({
                message:data
            })
        }else{
            res.status(404).send({
                message:`id ${req.params.id} is not there`
            })
        }
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            messagge : err.message|| "server error"
        })
    })
}
exports.employeePutById=(req, res)=>{
    employee.update(req.body, {where:{id:req.params.id}}).then(up=>{
        if(up){
            res.send({
                message:"employee deatils have been updated successfully"
            })
        }else{
            res.status(404).send({
                message:`id ${req.params.id} is not there`
            })
        }
    }).catch(err=>{
        res.status(500).send({
            message: err.message||"server is not working properly"
        })
    })
}
exports.employeeDeleteById=(req, res)=>{
    employee.destroy({where:{id: req.params.id}}).then(dl=>{
        if(dl){
            res.send({
                message:`id ${req.params.id} was deleted`
            })
        }else{
            res.status(404).send({
                message:`id ${req.params.id} is not there`
            })
        }
    }).catch(err=>{
        res.status(500).send({
            message:err.message|| "server error"
        })
    })
}