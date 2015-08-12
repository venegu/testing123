(function () {
    var getNode = function(s) {
        return document.querySelector(s);
    },
    /* Get required nodes */
    textarea = getNode('.c-textarea'),
    chatName = getNode('.c-name'),
    messages = getNode('.c-messages'),
    status = getNode('span'),

    statusDef = status.textContent,
    setStatus = function(s) {
        status.textContent = s;

        if(s !== statusDef) {
            var delay = setTimeout(function(){
                setStatus(statusDef);
                clearInterval(delay);
            }, 2500);
        }
    };
    //setStatus('Testing');

    try {
        var socket = io.connect('http://127.0.0.1:8080')
    }
    catch (e) {
        /* set status to warn user */
    }

    if(socket !== undefined) {
        /* Listen for output */
        socket.on('output', function(data) {
            //console.log(data);
            if(data.length) {
                for(var x = 0; x < data.length; x = x + 1) {
                    /* looping through count of messages */
                    var message = document.createElement('div');
                    message.setAttribute('class', 'c-message');
                    message.textContent = data[x].name + ': ' + data[x].message;

                    messages.appendChild(message);
                    /* Inserting in reverse order */
                    // messages.insertBefore(message, messages.firstChild);
                }
            }
        });

        /* Listen for status */
        socket.on('status', function(data) {
            setStatus((typeof data === 'object') ? data.message : data);

            if(data.clear === true) {
                textarea.value = '';
            }
        });

        /* Listen for keydown */
        textarea.addEventListener('keydown', function(event) {
            var self = this;
            var name = chatName.value;

            //console.log(event.which); /* which key is pressed down */
            /* 13 == enter key */
            /* 32 == shit key */

            /* Mulitple lines in the textarea */
            if(event.which === 13 && event.shiftKey === false) {
                //console.log('Send!');
                socket.emit('input', {name: name, message: self.value});
                event.preventDefault();
            }
        });
    }
})();