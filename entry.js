const http = require('http');
const getRequest = require('./methods-handler/get-request');
const postRequest = require('./methods-handler/post-request');
const putRequest = require('./methods-handler/put-request');
const deleteAm = require('./methods-handler/deleter');

let movies = require('./api-data/movies.json')

//require('dotenv').config();


const PORT = process.env.PORT || 5600;
/**
 * I'm using this value cos live server is always runniing on 5500
 * so I thought it would be cool if i moved a hunnid higher 😂 😂 😂 
 */


const server = http.createServer( (req,res)=>{


    /**
     * The following logic is to handle the different http verb use cases
     */

    req.movies = movies;
switch(req.method){
case "GET":
getRequest(req, res);
break;

case "POST":
postRequest(req,res); 
break;

case "PUT":
putRequest(req,res);
break;

case "DELETE":
deleteAm(req,res);
break;

default:

res.statusCode = 200;
res.setHeader("Content-Type", "application/json");
res.write(JSON.stringify({title:"Not found", message: "Route not found"}));
res.end();

}

});

server.listen(PORT, ()=>{
    console.log(`Server started on port: ${PORT}`);
    
} )