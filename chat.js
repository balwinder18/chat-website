const http = require("http");
const express = require("express");
const { prototype } = require("semver/classes/comparator");
const app = express();

const server = http.createServer(app);
const port =process.env.PORT || 3000;
     app.use(express.static(__dirname+"/public"));


app.get('/' , (req,res)=>{
    res.sendFile(__dirname+"/chat.html")
})

var users = {};

const io=require("socket.io")(server);
io.on("connection" , (socket)=>{
    socket.on("newuser" , (username)=>{
        users[socket.id]=username;
        socket.broadcast.emit("newuser" , username);
        io.emit("userlist" , users);

    })  
       
    socket.on("disconnect" , ()=>{
            socket.broadcast.emit("userdisconnect" , user = users[socket.id]);
            delete users[socket.id];
            io.emit("userlist" , users);
    })

    socket.on('message', (data)=>{
        socket.broadcast.emit("message" , {user: data.user , msg:data.msg});
      })
})   
   
  




server.listen(port , ()=>{
      console.log("server started at" + port)
})  
  
 