var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'nomazon'
});

connection.connect(function(err) {
    if (err) console.log(err);
    // console.log(connection.threadId);
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
        // console.log(ans.id);
        // console.log(ans.qty);
        var item_price = 0;
        var q = "SELECT price FROM products WHERE item_id = ?;";
        connection.query(q, [ans.id], function(err, res) {
            if (!err && res[0]) {
                item_price = res[0].price;
            } else {
                // console.log(err);
            }
        });
        var q = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?;";

        connection.query(q, [ans.qty, ans.id], function(err, res) {

            if (!err && res.changedRows > 0) {
                // console.table(res);
                console.log('Your total amount for the order is $' + (ans.qty * item_price));
            } else {
                // console.log(err);
                console.log("Insufficient quantity or Item not found!");
            }
            getInput();
        });
    });
}

function getInput() {
    inquirer.prompt({
        name: "action",
        type: "input",
        message: "Would you like to shop at Nomazon? (Y/N)",
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

getInput();
// purchaser();
// printItemList();