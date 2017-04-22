var mysql = require('mysql');
var inquirer = require('inquirer');

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
    connection.end();
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


// var getInput = function() {
//     inquirer.prompt({
//         name: "action",
//         type: "input",
//         message: "Would you like to shop at Nomazon? (Y/N)",
//         validate: function(v) {
//             return v.toLowerCase() === 'y' || v.toLowerCase() === 'n';
//         }
//     }).then(function(ans) {
//         if (ans.action.toLowerCase() === 'y') {
//             getInput();
//         }
//     });
// }

// var purchase = function() {
//     inquirer.prompt({

//     }, {

//     }).then(function(ans)) {

//     }
// }

// getInput();