
//to load files, npm install package --save  **DO THIS IN THE SERVER FILE, WHERE YOUR PACKAGE IS.
const express = require('express'); //load the express library into the file
const mysql = require('mysql');
const mysqlcredentials = require('./mysqlcreds.js');
const db = mysql.createConnection(mysqlcredentials);//hey mysql library, make a connection to the database, use these credentials to make that connection

const server = express();


server.use( express.static(__dirname +'/html') );//serving index.html, takes in a path
//__dirname is your current working directory
//only works on static files


//takes in two parameters, 
//the path to listen for,
//the callback function to call once that path has been received
server.get('/api/grades', (req,res)=>{//could be req and res
    res.send(`{
        "success": true,
        "data": [{
            "id": 1,
            "name": "Vivian Le",
            "course": "Linear Algebra",
            "grade": 80
        }, {
            "id": 2,
            "name": "Spongebob Squarepants",
            "course": "Pineapple",
            "grade": 100
        }, {
            "id": 3,
            "name": "Squidward Null",
            "course": "Squidwardian History",
            "grade": 30
        }, {
            "id": 4,
            "name": "Mr Krabs",
            "course": "Money",
            "grade": 60
        }]
    }`)
    
    //parameters: an object representing all of the data coming from the client to the server
    //and an object representing all of the data going from the server to the client
})//called an endpoint


//listen is a method in server that requires 2 parameters, the port and a callback function
server.listen(3001,()=>{
    console.log('server is running on port 3001');
    console.log('carrier has arrived');
}) 