const db = require("../models");
const Company = db.company;
const Op = db.Sequelize.Op;
exports.CompanyBoard=(req, res)=>{res.status(200).send("company  Content")};
exports.CompanyPost=(req, res)=>{
    //doing post operation
    // if(!req.body.name || !req.body.email || !req.body.phone || !req.body.website){
    //     res.status(404).send("Enter all the contents")
    // }
    Company.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        website:req.body.website
    }).then(company=>{
        //console.log('----------------------------company',company);
        res.status(200).send({
            message:"company Detailes added",
            response: company.data
    })
    }).catch(err=>{
        res.status(500).send({
            message:err.message||"Some error occured while creating the Tutorial ."
        })
    })
};
exports.CompanyGet=(req, res)=>{
    Company.findAll().then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            messagge : err.message|| "server error"
        })
    })
} 
exports.CompanyGetById=(req, res)=>{
    Company.findByPk(req.params.id).then(data=>{
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
exports.CompanyPutById=(req, res)=>{
    Company.update(req.body, {where:{id:req.params.id}}).then(up=>{
        if(up){
            res.send({
                message:"Company deatils have been updated successfully"
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
exports.CompanyDeleteById=(req, res)=>{
    Company.destroy({where:{id: req.params.id}}).then(dl=>{
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