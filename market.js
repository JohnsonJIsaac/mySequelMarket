// dependancies:
let inquirer = require("inquirer");
let mysql = require("mysql");
// necessary info for connecting to mysql
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "marketdb"
});
//running connection
connection.connect(function(err) {
  if (err) throw err;
  console.log("Welcome to Morgoth's Forge.");
  browseWares();
});
//console logging all items in shop
const browseWares = function() {
    connection.query("SELECT * FROM inventory", function(err, results) {
        if (err) throw err;
        console.table(results);
    })
};
//setting execute as "do the thing" function
let execute = function() {
    //querying mysql
    connection.query("SELECT * FROM inventory", function(err, results) {
        if (err) throw err;
        //using dependancy "inquirer" to prompt user to choose item
        inquirer.prompt([
            {
            name: "object",
            type: "list",
            choices: function() {
                const fullInventory = [];
                for (let i = 0; i < results.length; i++) {
                    fullInventory.push(results[i].item);
                } 
                return fullInventory;
            },
            message: "Choose your item."       
        },
        {
            // inquirer to allow user to decide quantity of item           
            name: "quantity",
            type: "input",
            message: "How many do you require?"
        }
        //promise returning quantity
    ]).then(function(answer) {
        let desiredObject;
        for (let i = 0; i < results.length; i++) {
            if (results[i].item === answer.item) {
                desiredObject = results[i];
            }
        }
        //updating stock number for specified item
        if (desiredObject.stock > parseInt(answer.amount)) {
            connection.query("UPDATE inventory SET ? WHERE ?", [
                {
                    stock: desiredObject.stock - parseInt(answer.amount)
                },
        ])};
        
    });
    });
};
execute();

//run error if desiredObject.stock > stock
//print purchase confirmation

