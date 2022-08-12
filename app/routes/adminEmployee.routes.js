const {authJwt} = require("../middleware");
const empController = require("../controller/employee.controller");
const { check, validationResult } = require('express-validator');
module.exports = function(app){
    app.use(function(req, res, next){
        res.header("Access-Control-Allow-Headers","x-access-token, origin, Content-Type, Accept");
        next();
    });
    //Employee CRUd done




    app.post("/api/post/adEmp",
    [
        check('email', 'invalid email')
                        .isEmail().isLength({ min: 10, max: 30 }),
        check('firstName', 'Name length should be 10 to 20 characters')
                        .isLength({ min: 10, max: 20 }),
        check('lastName', 'Name length should be 10 to 20 characters')
                        .isLength({ min: 10, max: 20 }),
        check('Company', 'should be integer').isNumeric(),
        check('phone', 'please enter 10 digit number').isNumeric({max:10})
                    //.match(/^\d{10}$/)
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json(errors)
        }else{next()}
    },
    [authJwt.verifyToken, authJwt.isAdmin],
    empController.employeePost);
    app.get("/api/get/adEmp",[authJwt.verifyToken, authJwt.isAdmin],
    empController.employeeGet);
    app.get("/api/getbyid/adEmp/:id",[authJwt.verifyToken, authJwt.isAdmin],
    empController.employeeGetById);
    app.put("/api/putbyid/adEmp/:id",[
        check('email', 'invalid email')
                        .isEmail().isLength({ min: 10, max: 30 }),
        check('firstName', 'Name length should be 10 to 20 characters')
                        .isLength({ min: 10, max: 20 }),
        check('lastName', 'Name length should be 10 to 20 characters')
                        .isLength({ min: 10, max: 20 }),
        check('Company', 'should be integer').isNumeric(),
        check('phone', 'please enter 10 digit number').isNumeric({max:10})
                        //.match(/^\d{10}$/)
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json(errors)
        }else{next()}
    },
    [authJwt.verifyToken, authJwt.isAdmin],
    empController.employeePutById);
    app.delete("/api/deleteById/adEmp/:id",[authJwt.verifyToken, authJwt.isAdmin],
    empController.employeeDeleteById);
}