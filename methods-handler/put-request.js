const requestBodyParser =  require ("../utilities/body-parser");
const writeToFile = require("../utilities/write-to-file");

/*
To be very honest I don't really understand how this code works, but I guess
you gotta fake it till you make it
*/
module.exports = async(req, res)=>{
    let baseUrl = req.url.substring(0 , req.url.lastIndexOf("/") + 1);
     let id= req.url.split("/").at(3);
          
     
    //  console.log(id);
    //  console.log(baseUrl);

     const regexV4 = new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      );


       
    if(!regexV4.test(id)){
        res.writeHead(404, {'Content-Type':'application/json'});
        res.end(JSON.stringify({title:"Validation failed", message: "This UUID na fake"}));
    }
        else if( baseUrl === "/api/movies/" && regexV4.test(id)){
            
        try{
     let body = await requestBodyParser(req);

     const index = req.movies.findIndex((movie)=>{
         return movie.id === id;
     });
     if (index === -1){
         res.statusCode=404;
     res.write(JSON.stringify({title:"Not found", message: "Movie not found"}));         
     res.end();
     } else{
       /*This is the actual put logic */req.movies[index] = {id, ...body};
       writeToFile(req.movies);
       res.writeHead(200, {"Content-Type" : "application/json"}); 
       res.end(JSON.stringify(req.movies[index]));
     }

     
        }


catch(err){
        console.log(err)
        res.writeHead(400, {'Content-Type':'application/json'});
        res.end(
            JSON.stringify({
                title:"Validation failed", 
                message: "Request Body is not valid ",})
                );
                
        };

      }  else{
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({title: "Not found", message:"Route not found"})
        );
      }   

};