const socket= io();
var username;
var chats =document.querySelector(".msg");
 var people = document.querySelector(".userlist");
 var usermsg = document.querySelector("#usermsg");
 var msgsend = document.querySelector("#msgsend");
var messages = document.querySelector(".msg")

do{
   username =  prompt("Enter your name");
}while(!username);

socket.emit("newuser" , username);

socket.on("newuser" , (socket_name)=>{
    userjoinleft(socket_name , 'joined');
}) 
 
 function userjoinleft(name , status) {
      let div = document.createElement("div");
      div.classList.add("join");
      let content = `<p><b>${name} ${status} </b></p>`;
      div.innerHTML = content;
      chats.appendChild(div);
      chats.scrollTop = chats.scrollHeight;
     
 }     
  
   socket.on("userdisconnect" , (user)=>{
        userjoinleft(user , 'left');
   })   
    
    socket.on("userlist" , (users)=>{
          people.innerHTML="";
          userarr = Object.values(users);
          for( i=0 ; i<userarr.length ;i++){
            let p  = document.createElement("p");
            p.innerText = userarr[i];
            people.appendChild(p);
          }
    })  
     
     msgsend.addEventListener('click' , ()=>{
      let data = {
         user: username,
         msg: usermsg.value,
      }; 
       if(usermsg.value !="" ){
         appendmessage(data , 'outgoing')
         socket.emit('message' , data);
         usermsg.value = "";
       }  
        
        
       
     }) 
       
     function appendmessage(data , status) {
          let div = document.createElement("div");
          div.classList.add('msg',status);
          let content = `<p> ${data.user}:- ${data.msg}`;
          div.innerHTML  = content;
         messages.appendChild(div);
          usermsg.innerHTML = "";
          chats.scrollTop = chats.scrollHeight;
     }  
           

     socket.on('message' , (data)=>{
      appendmessage(data , 'incoming'); 
     })