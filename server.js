//declaring variables to access the different nodejs packages 
const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');
const app = express(); //function to create an express application

//convinient variable to refer to the html drectory
var html_dir = './public/';

//morgan variable to give short information of our server activities
app.use(morgan('short'));

//telling the variable parser to use classic encoding. Values can only be strings or arrays.
app.use(parser.urlencoded({
    extended: false
}));

//going into the public folder to pick the static packages 
app.use(express.static('./public'));

//session
app.use(session({
    //login session to remain secret
    secret: 'secret',

    resave: true,
    //even if the login isn't successful the session is saved to see this
    saveUninitialized: true
}));

//routes to serve the static HTML files
var db = {root:__dirname};
app.get('/', function(req, res) {
    res.sendFile(html_dir + 'cards.html', db);
});

// app.get('/', function (req, res) {
//     res.sendFile(html_dir + 'cards.html');
// });


//creating the database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'refactory',
    
});

//the route for the form page
app.post('/form', (req, res) => {
    const theBody = req.body;
//object created to pick the inputs from the form
let obj = {
    CustomerID: theBody.customer,
    Name: theBody.name,
    State: theBody.state,
    PartNumber : theBody.pn,
    PricePerPart: theBody.pr,
    Quantity: theBody.quty,
    Shipping: theBody.rad,
    Total: theBody.total,
    retail: theBody.rc,
    oversize: theBody.cont,
    
};


//assigning variables to get the inputs from the form
const states = obj.State;
const price = obj.PricePerPart;
const quantity = obj.Quantity;
const retail = obj.retail;
const oversize = obj.oversize;
const Shipped = obj.Shipping;





console.log(states,price,quantity);

//assigning variables for the calculations
var total,cost,shipfee,salestax;

/*Sales Tax Calculation*/

//Cost Calculation
cost = parseFloat(price) * parseFloat(quantity);

//Calculation of Salestax if a certain state is chosen and the discount for the different state
if(states=='Kampala' && retail){
    salestax=(10/100)* cost;
}
else if(states=='Entebbe' && retail){
    salestax=(5/100)* cost;
}
else if(states=='Mbarara' && retail){
    salestax=(5/100) * cost;
} 
else{
    salestax=0;
}
console.log(price, quantity, salestax);

//Calculation of Shipping & Handling Fee

/*Checking if the package is oversize and the different
costs if it is oversize. Calculation of the shipping costs
plus the oversize costs */
if (oversize){
    if(Shipped){
        if(Shipped == 'fed'){
            shipfee=parseFloat(quantity) * (9.25+5.00);
        }
        else if(Shipped == 'us'){
            shipfee=parseFloat(quantity) * (8.50+5.00);
        }
        else if(Shipped == 'feda'){
            shipfee=parseFloat(quantity) * (12.00+5.00);
        }
        else{
            shipfee=parseFloat(quantity) * (7.00+5.00);
        }
    }
}
//if it isnt oversize, there's no extra charge
else{
    if(Shipped){
        if(Shipped == 'fed'){
            shipfee=parseFloat(quantity) * 9.25;
        }
        else if(Shipped == 'us'){
            shipfee=parseFloat(quantity) * 8.50;
        }
        else if(Shipped == 'feda'){
            shipfee=parseFloat(quantity) * 12.00;
        }
        else{
            shipfee=parseFloat(quantity) * 7.00;
        }

    }
}

console.log(shipfee, Shipped);

/* calculation of the total*/
total = cost+shipfee+salestax;

console.log(total);




//console.log('the obj: ' + JSON.stringify(obj));

//query for inserting into the database
const querystring = 
"INSERT INTO toyota(CustomerID, Name, State, PartNumber, PricePerPart, Quantity, Shipping, Total) VALUES(?,?,?,?,?,?,?,?)";
//using the sql connection to apply the querystring and pass them to the variables
connection.query(querystring, [
obj.CustomerID, 
obj.Name, 
obj.State,
obj.PartNumber,
obj.PricePerPart, 
obj.Quantity, 
obj.Shipping,
total,
obj.retail,
obj.oversize,
obj.Shipped

]);

console.log('testing...');
res.end();
// res.end();
// setTimeout(function() {
//     res.redirect("/")
//     res.end();
// }, 10000);

// res.redirect('/')
// res.end();
});

//notifying the console that the server will listen at port 3000
console.log('Server is listening from port 3000');
app.listen(3000);