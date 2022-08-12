const {authJwt} = require("../middleware");
const empController = require("../controller/employee.controller");
const { check, validationResult } = require('express-validator');
module.exports = function(app){
    app.use(function(req, res, next){
        res.header("Access-Control-Allow-Headers","x-access-token, origin, Content-Type, Accept");
        next();
    });
    //Employee CRUD
    app.get("/api/test/emp",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    empController.employeeBoard);
    app.post("/api/post/emp",[
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
    },[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    empController.employeePost);
    app.get("/api/get/emp",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    empController.employeeGet);
    app.get("/api/getbyid/emp/:id",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    empController.employeeGetById);
}