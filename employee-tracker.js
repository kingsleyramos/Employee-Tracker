const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// Create properties for DB connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_DB"
});

// Create Connection
connection.connect(function(err) {
    if (err) throw err;
    mainMenu();
});

function mainMenu(){
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all employees by department",
        "View all employees by role",
        "Add employee",
        "Add department",
        "Add role",
        "Update employee role"
      ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case "View all employees":
                viewAllEmp();
                break;

            case "View all employees by department":
                viewAllEmpByDept();
                break;

            case "View all employees by role":
                viewAllEmpByRole();
                break;

            case "Add employee":
                addEmp();
                break;

            case "Add department":
                addDept();
                break;
            case "Add role":
                songAndAlbumSearch();
                break;
            case "Update employee role":
                updateEmpRole();
                break;
        }
    });
}

function viewAllEmp(){
    mainMenu();
}