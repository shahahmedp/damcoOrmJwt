const {authJwt} = require("../middleware");
const allController = require("../controller/user.controller");
module.exports = function(app){
    app.use(function(req, res, next){
        res.header("Access-Control-Allow-Headers","x-access-token, origin, Content-Type, Accept");
        next();
    });
    app.get("/api/test/all", allController.allAccess);
    // app.get("/api/test/emp",[authJwt.verifyToken, authJwt.isEmployee],
    // controller.EmployeeBoard);
    // app.get("/api/test/cmpy",[authJwt.verifyToken, authJwt.isCompany], controller.CompanyBoard);
    //admin
    app.get("/api/test/admin",[authJwt.verifyToken, authJwt.isAdmin], allController.AdminBoard);

    /*//Employee CRUD
    app.get("/api/test/emp",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    empController.EmployeeBoard);
    app.post("/api/post/emp",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    empController.EmployeeBoard);
    app.get("/api/get/emp",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    empController.EmployeeBoard);
    app.get("/api/getbyid/emp:id",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    empController.EmployeeBoard);
    app.put("/api/putbyid/emp:id",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    empController.EmployeeBoard);
    app.patch("/api/patchById/emp:id",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    empController.EmployeeBoard);
    app.delete("/api/deleteById/emp:id",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    empController.EmployeeBoard);
    //Compant CRUD
    app.get("/api/test/cmpy",[authJwt.verifyToken, authJwt.isAdmin], cmpController.CompanyBoard);
    app.post("/api/post/cmpy",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    cmpController.CompanyBoard);
    app.get("/api/get/cmpy",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    cmpController.CompanyBoard);
    app.get("/api/getbyid/cmpy:id",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    cmpController.CompanyBoard);
    app.put("/api/putbyid/cmpy:id",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    cmpController.CompanyBoard);
    app.patch("/api/patchById/cmpy:id",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    cmpController.CompanyBoard);
    app.delete("/api/deleteById/cmpy:id",[authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    cmpController.CompanyBoard); */
}