const requestBodyParser =  require ("../utilities/body-parser");
const crypto = require("crypto");
const writeToFile = require("../utilities/write-to-file");

module.exports =  async (req, res)=>{
    if(req.url === "/api/movies"){
        try{
            let body = await requestBodyParser(req);
            body.id = crypto.randomUUID();
            req.movies.push(body);
                      
/**
 * As of right now, It's able to take in input and write it to the file temporarily,
 * I need it to happen permanently
 */


/*This line is where the magic of permanently writing happens*/      writeToFile(req.movies);
            res.writeHead(201,{"Content-Type" : "application/json"});
           res.end();
 
        } catch(err){
            console.log(err);
            res.writeHead(400, {'Content-Type':'application/json'});
            res.end(
                JSON.stringify({
                    title:"Validation failed", 
                    message: "Request Body is not valid ",})
                    );
        }
    }
    
    else
    {
        res.writeHead(404, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({title:"Not found", message: "Route not found"}));
    }
}
