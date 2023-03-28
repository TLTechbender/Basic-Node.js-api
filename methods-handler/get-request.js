module.exports = (req, res)=>{
let baseUrl = req.url.substring(0 , req.url.lastIndexOf("/") + 1);
     let id= req.url.split("/").at(3);
          
     
     console.log(id);
     console.log(baseUrl);
 

     /*
     Beginning of random uuid checker
     */
     const regexV4 = new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      );
/**
 * Ending of random uuid checker, I still don't really undertand regex
 */

    if(req.url ==="/api/movies"){
        res.statusCode=200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(req.movies));
         res.end();

    } 

    else if(!regexV4.test(id)){
        res.writeHead(404, {'Content-Type':'application/json'});
        res.end(JSON.stringify({title:"Validation failed", message: "This UUID na fake"}));
    }

    /**
     * The reason we are checking for two conditions here is that 
     * the user can enter any random thing and manage to access our 
     * api randomly, and of course we don't want that to happen
     */
    else if( baseUrl === "/api/movies/" && regexV4.test(id)){
        res.setHeader("Content-Type", "application/json");
       
/**
 * We have to be able to filter a movie out when it's uuid is called in the request
 
*/
let filteredMovie = req.movies.filter((movie)=>{
    return movie.id===id;

});


if(filteredMovie.length > 0){
    res.statusCode=200;
    res.write(JSON.stringify(filteredMovie));
    res.end();
}
 
else{
    res.statusCode=404;
    res.write(JSON.stringify({title:"Not found", message: "Movie not found"}));
   res.end();
}

        
     
    
}
    
    else
    {
        res.writeHead(404, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({title:"Not found", message: "Route not found"}));
    }
} 