/* Small test to check nodemon works */
/*console.log('Worked');*/

/* Importing necessary technology */
var mongo = require('mongodb').MongoClient; /* Allows us to connect to datavase */
var client = require('socket.io').listen(8080).sockets;

/* takes server & callback - chat is the name of the database */
mongo.connect('mongodb://127.0.0.1/chat', function(err, db) {
	if(err) throw err;
	/* connecting and a closure: whatever needs to be done after client is connected */
	client.on('connection', function(socket) {
		var col = db.collection('messages');
		var sendStatus = function(s) {
			socket.emit('status', s);
		};

		/* Emit all the previous messages */
		/* Sorting last first! */
		col.find().limit(50).sort({_id: 1}).toArray(function(err, res){
			if(err) throw err;
			socket.emit('output', res);
			/* This will only emit to people who just joined the chat */
		});

		/* waiting for input */
		socket.on('input', function(data) {
			/*console.log(data);*/
			/* grabbing data */
			var name = data.name;
			var message = data.message;
			/* Checking for whitespace - regular expression */
			whiteSpacePattern = /^\s*$/;

			if(whiteSpacePattern.test(name)||whiteSpacePattern.test(message)) {
				//console.log('oi!');
				sendStatus('Oi! Name & message silly.');
			}
			else {
				/* Inserting into mongo database */
				col.insert({name:name, message:message}, function() {
					/* Emit latest message to all clients */
					client.emit('output', [data]);

					//console.log('inserted');
					sendStatus({
						message: "Sent fooh.",
						clear: true
					}); /* ending status sent */
				}); /* end insert */
			}/* whitespace checking end */
		}); /* end socket */
	});  /* end connection */
}); /* end mongo.connect */