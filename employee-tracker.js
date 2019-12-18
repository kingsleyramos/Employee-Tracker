const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
//const util = require("util");
const promisemysql = require("promise-mysql");

// Create properties for DB connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_DB"
});


// Create Connection
connection.connect((err) => {
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
    .then((answer) => {
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
                addRole();
                break;
            case "Update employee role":
                updateEmpRole();
                break;
        }
    });
}

function viewAllEmp(){

    let query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";
    connection.query(query, function(err, res) {
        if(err) return err;
        console.log("\n");
        console.table(res);
        mainMenu();
    });
}

function viewAllEmpByDept(){

    //let deptConnection;
    let depArr = [];

    promisemysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "employees_DB"
    }).then((conn) => {
        //let deptConnection = conn;
        return conn.query('SELECT name FROM department');
    }).then(function(value){
        for (i=0; i < value.length; i++){
            depArr.push(value[i].name);
            //console.log(value[i].name);
        }
    }).then(() => {
        inquirer.prompt({
            name: "department",
            type: "list",
            message: "What department would you like to search?",
            choices: depArr
        })    
        .then((answer) => {

            let query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.name = '${answer.department}' ORDER BY ID ASC`;

            //console.log(query);
    
            connection.query(query, (err, res) => {
                if(err) return err;
                //console.log("query Connection");
                console.log("\n");
                console.table(res);
                mainMenu();
            });
        });
    });

    // let queryDept = "SELECT name FROM department";
    // let deptArray = [];


    // const deptArray = await connection.query(queryDept); //, (err, res) => {

        // for (i=0; i < res.length; i++){
        //     deptArray.push(res[i].name);
        //     console.log(arr[i].name);
        // }


    //}).then(() =>{
        // console.log(deptArray.toString());
        //console.log(deptArray);
    //});


    // connection.query('SELECT name FROM department', function(err, res) {

    //     let deptArray = [];

    //     for (i=0; i < res.length; i++){
    //         deptArray.push(res[i].name);
    //         console.log(res[i].name);
    //     }


    // }).then(()=>{
    //     inquirer.prompt({
    //         name: "department",
    //         type: "list",
    //         message: "What department would you like to search?",
    //         choices: deptArray
    //     })    
    //     .then(function(answer) {
    //         let query = `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.name = ${answer}`;
    
    //         let queryDept = "SELECT name FROM department";
    
    //         connection.query(query, function(err, res) {
    //             if(err) return err;
    //             console.log("\n");
    //              console.log(res);
    //             mainMenu();
    //         });
    //     });
    //     mainMenu();
    // });


    //mainMenu();
}

function viewAllEmpByRole(){

    let roleArr = [];

    promisemysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "employees_DB"
    }).then((conn) => {
        //let deptConnection = conn;
        return conn.query('SELECT title FROM role');
    }).then(function(value){
        for (i=0; i < value.length; i++){
            roleArr.push(value[i].title);
            //console.log(value[i].name);
        }
    }).then(() => {
        inquirer.prompt({
            name: "role",
            type: "list",
            message: "What role would you like to search?",
            choices: roleArr
        })    
        .then((answer) => {

            let query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE role.title = '${answer.role}' ORDER BY ID ASC`;

            //console.log(query);
    
            connection.query(query, (err, res) => {
                if(err) return err;
                //console.log("query Connection");
                console.log("\n");
                console.table(res);
                mainMenu();
            });
        });
    });
}

function addEmp(){

}

function addDept(){
    
}

function addRole(){

}

function updateEmpRole(){
    
}