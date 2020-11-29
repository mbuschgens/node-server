# node-server

Node-socket-server

/// THOSE ARE FOR SECURE HTTPS VERSION

/// no apt-get on mac? follow the steps
// instal xcode
// ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
// brew install wget
// echo 'export PATH="/usr/local/opt/openssl@1.1/bin:$PATH"' >> ~/.profile
// brew install python

// ??? replace apt-get with brrew : sudo apt-get install nodejs-legacy
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
/// als 80 in gebruik is // sudo apachectl stop

/// - Congratulations! Your certificate and chain have been saved at:
/// /etc/letsencrypt/live/turnhout.ddns.net/fullchain.pem
/// Your key file has been saved at:
/// /etc/letsencrypt/live/turnhout.ddns.net/privkey.pem

/// give acceess to dir

// sudo chmod -R 755 /etc/letsencrypt/live/
// sudo cp /etc/letsencrypt/live/turnhout.ddns.net/privkey.pem /etc/ssl/certs/privkey.pem
// sudo cp /etc/letsencrypt/live/turnhout.ddns.net/fullchain.pem /etc/ssl/certs/fullchain.pem
