/// THOSE ARE FOR SECURE HTTPS VERSION

/// no apt-get on mac? follow the steps
// instal xcode
// ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
// brew install wget
// echo 'export PATH="/usr/local/opt/openssl@1.1/bin:$PATH"' >> ~/.profile
// brew install python

// ??? replace  apt-get with brrew : sudo apt-get install nodejs-legacy
// brew install nodejs

/// optional not special needed // sudo npm install pm2 -g

// sudo npm install -g nodemon
// sudo npm i npm@latest -g
// sudo npm install -g n
/// sudo n latest
// PATH="$PATH"
// sudo npm install socket.io
// sudo npm install fs -g
// sudo npm install express -g

/// for macos brew install certbot
/// replace > sudo apt-get install certbot -y
// brew install certbot

// npm i greenlock

/// on server create ssl certs and key

// sudo openssl req -x509 -nodes -days 1095 -newkey rsa:2048 -out /etc/ssl/certs/server.crt -keyout /etc/ssl/certs/server.key

// sudo certbot certonly --cert-path /etc/ssl/certs/server --key-path /etc/ssl/certs/server --chain-path /etc/ssl/certs/server --fullchain-path /etc/ssl/certs/server
/// als 80 in gebruik is  // sudo apachectl stop

///  - Congratulations! Your certificate and chain have been saved at:
///   /etc/letsencrypt/live/turnhout.ddns.net/fullchain.pem
///   Your key file has been saved at:
///   /etc/letsencrypt/live/turnhout.ddns.net/privkey.pem

/// give acceess to dir

// sudo chmod -R 755 /etc/letsencrypt/live/
// sudo cp /etc/letsencrypt/live/turnhout.ddns.net/privkey.pem /etc/ssl/certs/privkey.pem
// sudo cp /etc/letsencrypt/live/turnhout.ddns.net/fullchain.pem /etc/ssl/certs/fullchain.pem

/// /etc/letsencrypt/live/turnhout.ddns.net/fullchain.pem
/// /etc/letsencrypt/live/turnhout.ddns.net/privkey.pem

let app = require("express")();
let fs = require("fs");

// var privateKey = fs.readFileSync('/etc/ssl/certs/server.key');
// var certificate = fs.readFileSync('/etc/ssl/certs/server.crt')

let privateKey = fs.readFileSync("certs/privkey.pem", "utf8");
let certificate = fs.readFileSync("certs/fullchain.pem", "utf8");

/// var privateKey = fs.readFileSync('/etc/letsencrypt/live/turnhout.ddns.net/privkey.pem');
/// var certificate = fs.readFileSync('/etc/letsencrypt/live/turnhout.ddns.net/fullchain.pem', 'utf8');

let credentials = { key: privateKey, cert: certificate };

/// var pkey = fs.readFileSync('/etc/ssl/certs/server.key');
/// var pcert = fs.readFileSync('/etc/ssl/certs/server.crt')

// var options = {
//     key: pkey,
//     cert: pcert
// };

let http = require("https").Server(credentials, app);

// let http = require('http').Server(app);

let io = require("socket.io")(http);

// app.get('/',function(req,res){
//   res.sendFile('/home/pi/Projects/TIMMMER/wwww/index.html');
// });

// let userCount = 0;
let usersrNames = {};

// let accounts = [];

let connections = [];
let users = [];

io.on("connection", (socket) => {
  let room = socket.handshake["query"]["room"];
  let email = socket.handshake["query"]["email"];

  if (email && room) {
    if (email !== "null") {
      // extra check
      // console.log("Have email and room");
      connections.push(socket);
      socket.join(room);

      console.log(
        " %s total sockets connected ONE NEW connected :" +
          room +
          "  - " +
          email,
        connections.length
      );

      socket.broadcast.emit(
        "Welcome",
        "To All : " + email + " connected to room: " + room
      );
    }
  }

  socket.on("disconnect", (data) => {
    connections.splice(connections.indexOf(socket), 1);
    socket.leave(room);

    let index = users.findIndex(function (o) {
      return o.userEmail === email;
    });
    if (index !== -1) users.splice(index, 1);

    // users.splice(
    //   users.findIndex(function (v) {
    //     return v.userEmail === email;
    //   }),
    //   1
    // );

    console.log("*** Overview after one REMOVED connection *** : " + email);
    console.log(" %s total sockets connected", connections.length);

    console.log(users);
  });

  socket.on("afmelden", (data) => {
    // console.log("afmelden");
    // console.log(data);

    let userEmail = data.email;
    // let usersocketId = data.socketId;

    let index = users.findIndex(function (o) {
      return o.userEmail === userEmail;
    });
    if (index !== -1) users.splice(index, 1);

    // users.splice(
    //   users.findIndex(function (v) {
    //     return v.userEmail === userEmail;
    //   }),
    //   1
    // );

    connections.splice(connections.indexOf(socket), 1);

    console.log("*** Overview after AFMELDEN connection *** : " + userEmail);
    console.log(" %s total sockets connected", connections.length);

    console.log(users);
  });

  // add accounts to list

  socket.on("setSocketId", (data) => {
    // console.log("setSocketId data : " + data);
    // console.log(data);
    let userEmail = data.email;
    let usersocketId = data.socketId;

    let index = users.findIndex(function (o) {
      return o.userEmail === userEmail;
    });
    if (index !== -1) users.splice(index, 1);

    const usersNames = { userEmail, usersocketId }; //create a user object to go in the array
    users.push(usersNames); //put it on the end of the array

    console.log("*** Overview all connections ***");
    console.log(users);
    //console.log('userCount: ' + userCount);
    // io.emit("connectedUsers", usersNames);
  });

  /// actions

  socket.on("sending message", (message) => {
    console.log("Message is received :", message);

    io.sockets.emit("new message", { message: message });
  });

  // voor view pagina
  socket.on("function", (data) => {
    console.log("Room: " + room + " function: " + data);
    io.emit("function", data);
    //io.to(room).emit('function', data);
  });

  socket.on("inschrijven", (data) => {
    console.log("Room: " + room + " inschrijven: " + data);
    //io.to(room).emit('data', data);
    io.emit("data", data);
  });

  socket.on("aanmelden", (data) => {
    console.log("Room: " + room + " aanmelden: " + data);
    //io.to(room).emit('aanmelden', data);
    io.emit("aanmelden", data);
  });

  socket.on("overzicht", (data) => {
    console.log("Room: " + room + " overzicht: " + data);
    //io.to(room).emit('data', data);
    io.emit("overzicht", data);
  });

  socket.on("herstel", (data) => {
    console.log("Room: " + room + " herstel: " + data);
    //io.to(room).emit('data', data);
    io.emit("herstel", data);
  });
});

// app.get('/', (req, res) => {
//     res.send('<span style="color: green">My Chat server 1.0</span>');
// });

// open op http://localhost:300/index.html

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(3000, function () {
  console.log("SSL listening on *:3000");
});
