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

function query() {
    if (connection) {
        // console.log(connection);
        // var query = "SELECT position, song, year FROM top5000 WHERE ?";
        var query = "SELECT * FROM products WHERE ?";
        // connection.query(query, { artist: answer.artist }, function(err, res) {
        connection.query(query, { department_name: 'Electronics' }, function(err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(res[i]);
                // console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
            }
        });
    }
}

// query();


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
        console.log(ans.id);
        console.log(ans.qty);
        getInput();
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
            // purchaser();
        } else {
            console.log("Good bye");
            connection.end();
        }
    });
}



getInput();
// purchaser();
// printItemList();