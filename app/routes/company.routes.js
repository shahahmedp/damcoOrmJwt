const {authJwt} = require("../middleware");
const cmpController = require("../controller/company.controller");
const { check, validationResult } = require('express-validator');
module.exports = function(app){
    app.use(function(req, res, next){
        res.header("Access-Control-Allow-Headers","x-access-token, origin, Content-Type, Accept");
        next();
    });
    //Company CRUD
    app.get("/api/test/cmpy",[authJwt.verifyToken, authJwt.isAdmin], cmpController.CompanyBoard);
    app.post("/api/post/cmpy",[
        check('email', 'invalid email')
                        .isEmail().isLength({ min: 10, max: 30 }),
        check('name', 'Name length should be 10 to 20 characters')
                        .isLength({ min: 10, max: 20 }),
        check('website', 'website length should be 10 to 20 characters')
                        .isLength({ min: 10, max: 20 }),
        check('phone', 'please enter 10 digit number').isNumeric({max:10})
                    //.match(/^\d{10}$/)
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json(errors)
        }else{next()}
    },
    [authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    cmpController.CompanyPost);
    app.get("/api/get/cmpy",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    cmpController.CompanyGet);
    app.get("/api/getbyid/cmpy/:id",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    cmpController.CompanyGetById);
    app.put("/api/putbyid/cmpy/:id",[
        check('email', 'invalid email')
                        .isEmail().isLength({ min: 10, max: 30 }),
        check('name', 'Name length should be 10 to 20 characters')
                        .isLength({ min: 10, max: 20 }),
        check('website', 'website length should be 10 to 20 characters')
                        .isLength({ min: 10, max: 20 }),
        check('phone', 'please enter 10 digit number').isNumeric({max:10})
                    //.match(/^\d{10}$/)
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json(errors)
        }else{next()}
    },
    [authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    cmpController.CompanyPutById);
    app.delete("/api/deleteById/cmpy/:id",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    cmpController.CompanyDeleteById);
}