var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');

var connection = mysql.createConnection({ host: 'localhost', port: 3306, user: 'root', password: '', database: 'nomazon' });
connection.connect(function(err) {
    if (err) console.log(err);
});

function getInput() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "Enter the index of following:",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
    }).then(function(ans) {
        switch (ans.action) {
            case "View Products for Sale":
                connection.query({
                    sql: "SELECT * FROM products;",
                    connectionTimeOut: 30000,
                    values: []
                }, function(err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(res);
                        getInput();
                    }
                });
                break;
            case "View Low Inventory":
                console.log("View Low Inventory");
                connection.query({
                    sql: "SELECT * FROM products WHERE stock_quantity <= 25;",
                    connectionTimeOut: 30000,
                    values: []
                }, function(err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(res);
                        getInput();
                    }
                });
                break;
            case "Add to Inventory":
                console.log("Add to Inventory");
                break;
            case "Add New Product":
                console.log("Add New Product");
                break;
            case "Exit":
                console.log("good bye...");
                connection.end();
                break;
        }
    });
}

getInput();