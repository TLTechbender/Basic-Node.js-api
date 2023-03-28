# Basic Node.js Crud Api
This is a simple Node.js crud api that  gave me a high level overview of how the backend works, it's not the most super organized or anything but it sure did gimme a bucket load of confidence.
Thank God!!

## Installation
 To install:
 -Download or clone the repo
 ```
git clone https://github.com/TLTechbender/Basic-Node.js-api.git
 ```

- Enter the directory 
```
cd Basic-movie-api
```
##### Install dependencies
``` 
- npm install
```
- Start the app
  
  In your terminal run npm start
  (The appication will start from the entry.js file)

  ```
  npm start
  ```
 ## Api Reference
This backend is hosted locally on your machine after you run npm start and it would most likely open on your browser, It looks messy on a browser so I would recommend you use Postman or the Thunderclient extension in VsCode marketplace, they make the entire thing look way better
 ### 1.) Get all movies
 ```
 GET/api/movies
 ```
Returns all the data stored in the database E.g

```
http://URL/api/movies
```

It should return a 200 status code with all the data displayed


### 2.) Get a particular movie

```
GET/api/movies/:id
```

Returns the particular movie you are looking for provided the movie is present in the database.

#### a.) Present Sir!
If the movie you are looking for is present in the database it should return a 200 status code with the movie

#### b.) Absent Sir!

If the movie you are looking for does not exist in the database, the classic error 404 is return along with this message
```
{
    "title": "Not found",
    "message": "Movie not found"
}
```

### 3.) Create a new movie

This would return a 201 message, but keep in mind that is this a very basic movie api and there might be some weird edge cases, for intance it's possible to create an empty data entry as a movie and it's gonna create it anyway, I didn't write any logic to handle that.

```
POST/api/movies
```

The following parameters should be included in the body of the request as a json file

```
 {
        "title": "Title of the movie",
        "year": "Year the movie was made",
        "genre": "What kind of movie this is i.e action, horror e.t.c",
        "rating": "How good is the movie on a scale of 1-10"
        
    }
```
### 4.) Update an existing movie

```
PATCH/api/movies/:id
```
This would update an existing item in the data with a particular id. The update should be added in the request body as json and if the update is successful it would return a 200 status code along with a response detailing the particular movie you just updated

E.g

```
{
       "Title": "Not an empty movie"
    }
```

returns 

```
{
    "id": "067175c3-4c5d-4d4b-8f1e-6a826c56f20a",
    "Title": "Not an empty movie"
}
```


### 5.) Delete a movie

```
DELETE/api/movies/:id
```
Deletes the specified movie and returns a 204 status code.



# Thanks for reading