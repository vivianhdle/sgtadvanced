
//to load files, npm install package --save  **DO THIS IN THE SERVER FILE, WHERE YOUR PACKAGE IS.
const express = require('express'); //load the express library into the file
const mysql = require('mysql');//load mysql library
const mysqlcredentials = require('./mysqlcreds.js');
//using the credentials that we loaded, establish a preliminary connection to the database
const db = mysql.createConnection(mysqlcredentials);//hey mysql library, make a connection to the database, use these credentials to make that connection

const server = express();


server.use( express.static(__dirname +'/html') );//serving index.html, takes in a path
//__dirname is your current working directory
//only works on static files

server.use(express.urlencoded({extended:false}));//have express pull body data that is url encoded and place it into an object called body


//takes in two parameters, 
//the path to listen for,
//the callback function to call once that path has been received
//parameters: an object representing all of the data coming from the client to the server
//and an object representing all of the data going from the server to the client
server.get('/api/grades', (req,res)=>{//could be req and res
    db.connect(()=>{
        const query = 'SELECT `id`, CONCAT(`givenname`," ",`surname`) AS `name`, `course`,`grade` FROM grades';
        db.query(query,(error,data,)=>{
            const output ={
                success:false
            }
            if (!error){
                output.success = true;
                output.data = data;
            } else {
                output.error = error;
            }
            res.send(output);
        })
    });
    
})//called an endpoint


server.post('/api/grades',(request,response)=>{
    db.c
})




//listen is a method in server that requires 2 parameters, the port and a callback function
server.listen(3001,()=>{
    console.log('server is running on port 3001');
    console.log('carrier has arrived');
}) 