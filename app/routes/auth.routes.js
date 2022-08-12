const {verifysignUp} = require("../middleware")
const controller = require("../controller/auth.controller");
const { check, validationResult } = require('express-validator');
module.exports = function(app) {
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        //path
        "/api/auth/signup",
        [
            //middlewares to verify
            //verifysignUp.checkDataRequest,
            verifysignUp.checkDuplicatUsernameOrEmail,
            verifysignUp.checkRolesExisted
        ],
        [
            check('email', 'invalid email')
                            .isEmail().isLength({ min: 10, max: 30 }),
            check('username', 'Name length should be 10 to 20 characters')
                            .isLength({ min: 10, max: 20 }),
            check(
                "password",
                "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ",
                )
                          .isLength({ min: 8 })
                          .matches(
                                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
                                  ),
            check('roles', 'array of roles should be there')
                            .isArray()
        ],
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json(errors)
            }else{next()}
        },
        // controllers
        controller.signup
    );
    app.post("/api/auth/signin",[
        check('username', 'Name length should be 10 to 20 characters')
                        .isLength({ min: 10, max: 20 }),
        check('password', 'Password length should be 8 to 10 characters')
                        .isLength({ min: 8, max: 10 })
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json(errors)
        }else{next()}
    },
     controller.signin)
};