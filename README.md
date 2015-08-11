#Vitanao
Spur of the moment bones to a chat application using node.js and MongoDB following a neat little tutorial.

This is purely to learn and just for fun 😸!

To run this project clone the repository and make sure you have mongoDB and Node JS installed. 

In addition to node you will also need to npm install some other things into the project directory:

```
  npm install socket.io
  npm install mongo
```
  
####Getting started with MongoDB
To get mongo running you will likely have hunt for it in your usr/local/bin/ file. If you can't find where these binaries are located try running the following command in your terminal: 

``` which mongo ```

If you're on a Mac it will likely be located in:

``` cd /usr/local/bin ```

From here you should `cd` into whatever directory the previous command provides on two separate terminal windows. On one of the terminal windows run:

``` mongod ```

This runs the mongo daemon. MongoDB will start to listen for connections.

In another terminal window run: 

``` mongo ```

This will connect us to the database and you will see a connection opened in the terminal running mongod. 

It's important to note that anything that any data that is stored within the database will be saved by default in:

``` cd /data/db ```

You can change this by changing some configurations :P. 

####Getting Started with NodeJS
To run the node.js server you simply need to run the following in the directory containing `server.js`:

``` node server.js``` 

And you should be good to go!
