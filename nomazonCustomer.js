var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');

var connection = mysql.createConnection({ host: 'localhost', port: 3306, user: 'root', password: '', database: 'nomazon' });
connection.connect(function(err) {
    if (err) console.log(err);
});

function printItemList(callback) {
    connection.query("SELECT * FROM products;", function(err, res) {
        console.log("");
        if (!err) {
            console.table("WELCOME TO NOMAZON", res);
            callback();
        } else {
            console.log(err);
        }
    });
}

function purchaser() {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Enter item id that you want to purchase: ",
        validate: function(v) {
            return !isNaN(parseFloat(v)) && isFinite(v);
        }
    }, {
        name: "qty",
        type: "input",
        message: "Enter the quantity that you want to purchase: ",
        validate: function(v) {
            return !isNaN(parseFloat(v)) && isFinite(v);
        }
    }]).then(function(ans) {
        var item_price = 0;
        var q = "SELECT price FROM products WHERE item_id = ?;";
        connection.query(q, [ans.id], function(err, res) {
            if (!err && res[0]) item_price = res[0].price;
        });
        var q = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?;";
        connection.query(q, [ans.qty, ans.id], function(err, res) {
            if (!err && res.changedRows > 0) {
                console.log('Thanks for your order. Your total amount is $' + (ans.qty * item_price).toFixed(2));
            } else {
                console.log("Insufficient quantity or Item not found!");
            }
            getInput();
        });
    });
}

function getInput(msg) {
    msg = msg || "Would you like to continue shopping with Nomazon? (Y/N)";
    inquirer.prompt({
        name: "action",
        type: "input",
        message: msg,
        validate: function(v) {
            return v.toLowerCase() === 'y' || v.toLowerCase() === 'n';
        }
    }).then(function(ans) {
        if (ans.action.toLowerCase() === 'y') {
            printItemList(purchaser);
        } else {
            console.log("Good bye");
            connection.end();
        }
    });
}

getInput("Welcome to Nomazon, press (Y) to print the list of items we have to offer, or (N) to exit :");