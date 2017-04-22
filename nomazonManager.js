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
                inquirer.prompt([{
                    name: "item_id",
                    type: "input",
                    message: "Enter item_id number: ",
                    validation: function(v) {
                        return !isNaN(parseFloat(v)) && isFinite(v);
                    }
                }, {
                    name: "stock_quantity",
                    type: "input",
                    message: "Enter stock quantity to add: ",
                    validation: function(v) {
                        return !isNaN(parseFloat(v)) && isFinite(v);
                    }
                }]).then(function(ans) {
                    connection.query({
                        sql: "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?;",
                        timeout: 30000,
                        values: [ans.stock_quantity, ans.item_id]
                    }, function(err, res) {
                        if (!err && res.changedRows > 0) {
                            console.log("----------------------------------------");
                            console.log("Successfully updated item #" + ans.item_id + " with " + ans.stock_quantity + " quantity.");
                            console.log("----------------------------------------");
                        } else {
                            console.log("Update opperation failed");
                            if (err) console.log("Error: " + err);
                        }
                        getInput();
                    });
                });
                break;
            case "Add New Product":
                console.log("Add New Product");
                inquirer.prompt([{
                    name: "item_id",
                    type: "input",
                    message: "Enter item id number: ",
                    validation: function(v) {
                        return !isNaN(parseFloat(v)) && isFinite(v);
                    }
                }, {
                    name: "product_name",
                    type: "input",
                    message: "Enter product name: ",
                    validation: function(v) {
                        return isNaN(v);
                    }
                }, {
                    name: "department_name",
                    type: "input",
                    message: "Enter product's department: ",
                    validation: function(v) {
                        return isNaN(v);
                    }
                }, {
                    name: "price",
                    type: "input",
                    message: "Enter product's price: ",
                    validation: function(v) {
                        return !isNaN(parseFloat(v)) && isFinite(v);
                    }
                }, {
                    name: "stock_quantity",
                    type: "input",
                    message: "Enter stock quantity of the product: ",
                    validation: function(v) {
                        return !isNaN(parseFloat(v)) && isFinite(v);
                    }
                }]).then(function(ans) {
                    connection.query({
                        sql: "INSERT INTO products (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES (?, ?, ?, ?, ?);",
                        timeout: 30000,
                        values: [ans.item_id, ans.product_name, ans.department_name, ans.price, ans.stock_quantity]
                    }, function(err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("------------------------------");
                            console.log("Successfully added new product");
                            console.log("------------------------------");
                        }
                        getInput();
                    });
                });
                break;
            case "Exit":
                console.log("good bye...");
                connection.end();
                break;
        }
    });
}

getInput();