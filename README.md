# Employee-Tracker

## Project Goal

Create an application for to manage employees, roles, and departments

## Challenges

### Struggle 1: Queries

The most difficult part of this assignment was learning how to query and quering correctly. I knew this was going to be the most difficult this was the first thing I did, to find the right query. I understood the concept of the JOINs but I did not understand the query code of it.

### Struggle 2: SQL Async Issue

An issue I was having was trying to query and promising a return right after. I was not able to figure out now to make the query into a promise, so I used promise-sql package. This helped with promises

### Struggle 3: Passing two arguments through a promise.

This took me a while to figure out but decided to do this route:

    ```javascript
    return Promise.all([
            conn.query('SELECT id, title FROM role ORDER BY title ASC'), 
            conn.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC")
        ]);
    }).then(([roles, managers]) => {
    ```