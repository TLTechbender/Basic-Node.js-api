const writeToFile = require("../utilities/write-to-file");

module.exports = (req, res)=>{
    let baseUrl = req.url.substring(0 , req.url.lastIndexOf("/") + 1);
    let id= req.url.split("/").at(3);
   
    /*
    Beginning of random uuid checker, we have to check for the uuid that we
    gon be deleting
    */
    const regexV4 = new RegExp(
       /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
     );

     
     if(!regexV4.test(id)){
        res.writeHead(404, {'Content-Type':'application/json'});
        res.end(JSON.stringify({title:"Validation failed", message: "You be scammer"}));
    }

    else if( baseUrl === "/api/movies/" && regexV4.test(id)){
    const index = req.movies.findIndex((movie)=>{
        return movie.id === id;
    });
    if (index === -1){
        res.statusCode=404;
    res.write(JSON.stringify({title:"Not found", message: "Movie not found"}));

       
        res.end();
    } else{
        req.movies.splice(index,1);
        /*I honestly don't know why I have to write again after deletion*/
        //writeToFile(req.movies);
         res.writeHead(204, {"Content-Type" : "application/json"});
        res.end(JSON.stringify(res.movies));
    }
    
    
    }
}