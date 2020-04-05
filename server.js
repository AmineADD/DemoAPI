//config server
const express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser')


const server = express();
//Configuration
        // parse application/x-www-form-urlencoded &&   parse application/json
        server.use(bodyParser.urlencoded({ extended: false }))
        server.use(bodyParser.json())


//Api 
server.get("/AllFriends",(request,response)=>{
     //get Data from JSON file
    let rawdata = fs.readFileSync('Friends.json');
    let friendsData = JSON.parse(rawdata);
    
    //response to client
    response.send(friendsData);
    response.end();
}); 

server.post("/ADD",(request,response)=>{
        //get Data from JSON file
        let rawdata = fs.readFileSync('Friends.json');
        let friendsData = JSON.parse(rawdata);
        
     //les parametres : in request Request
    friendsData.push({
        "NAME" : request.body.name,
        "USERNAME" : request.body.username,
        "TWEETS" : request.body.TWEETS,
        "FOLLOWING" : request.body.FOLLOWING,
        "FOLLOWERS" : request.body.FOLLOWERS,
        "IMG" : request.body.IMG
    });
    //Send Data Response 
    fs.writeFile('Friends.json', JSON.stringify(friendsData), 'utf8',()=>{
        response.writeHead(301,
            {Location: '/Friends.html'}
          );
        response.end(); 
    });   
})



//folder public
server.use(express.static('public'));



//Seve Port 
server.listen(2020,()=>{
    console.log("server is listning");
})