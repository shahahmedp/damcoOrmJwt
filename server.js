const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions={
    origin: "https://localhost:3002"
}
//require the model

const db=require("./app/models")
const Role= db.role;
db.sequelize.sync({force: true}).then(()=>{
    console.log('sync and resync db');
    initial()
})
function initial(){
    Role.create({
        id: 1,
        name: "Company"
    });
    Role.create({
        id: 2,
        name: "Employee"
    })
    Role.create({
        id: 3,
        name: "admin"
    })
}
// setting up the third party, middlewares
//setting up cors origin
app.use(cors(corsOptions));
//content type= application/json ans
app.use(express.json());
//content type=h application/x-www-form-urlecoded
app.use(express.urlencoded({extended: true}));

const PORT=process.env.PORT || 3001

app.get("/rquirmnt", (req,res) =>{
    //res.json({message:<p>hello</p>})
    res.send(`<ul>
    <li>
    <b>shahbaaz development</b>
</li>
     <li>· Basic JWT Authentication: ability to log in as administrator</li>
    <li>· Use Node, Express, Sequelize, JWT</li>
    
    <li>· Create Express routing to demonstrate CRUD functionality (Create / Read / Update / Delete) for two API items: Companies and Employees</li>
    
   <li> · Use Express validation middleware to demonstrate basic payload validation</li>
    <li>· Use Express middleware to enforce authorisation</li>
    <li> · Demonstrate the use of DB transactions where applicable</li>
    <li> · Companies DB table consists of these fields: Name (required), email, phone, website</li>
    <li>            · Employees DB table consists of these fields: First name (required), last name (required), Company (foreign key to Companies), email, phone</li>     
    <li>· Create Integration tests for all API’s, all tests should pass. Use Jest or Mocha.</li>
    
   <li> · Create a professional README with instructions on how to install and test</li>
    
   <li>· Project to be uploaded to GitHub so the source code can be reviewed when finished.</li>
    </ul>`);
})

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/company.routes')(app);
require('./app/routes/employee.routes')(app);
require('./app/routes/adminEmployee.routes')(app);
//port to listen
app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
})