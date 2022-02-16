const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const mysql = require('mysql');
var cors = require('cors')

app.use(express.json());
app.use(cors());

io.on("connection", socket => {
    socket.emit("your id", socket.id);
    socket.on("send message", body => {
        io.emit("message", body)
    })
})

let db = mysql.createConnection({

    host : 'localhost',
    user : 'root',
    password : '',
    database : 'login_res'
});

db.connect((err) => {
    if(err) throw err;
    console.log('Database Connected..');
});

app.post('/register', (req, res)=> {

    const username = req.body.username;
    const password = req.body.password;



    db.query(
        "INSERT INTO users (username, password) VALUE (?,?)", 
        [username, password],
        (err, result)=>{
        console.log(err);
    }
    );
});

app.post('/login', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;



    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?", 
        [username, password],
        (err, result) => {
            if (err) {
               res.send({err:err})
            } 

                if (result.length > 0){
                    res.send(result);

                  
                    
                } else {
                    res.send({message: "Wrong username/password"});
                }
            
    }
    );
})


server.listen(8000, () => console.log("server is running on port 8000"));