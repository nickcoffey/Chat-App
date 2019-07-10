var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css')
})
app.get('/scripts.js', (req, res) => {
    res.sendFile(__dirname + '/scripts.js')
})

io.on('connection', (socket) => {
    console.log('A user connected')
    socket.name = "Anonymous" // default username

    socket.on('disconnect', () => {
        console.log('User disconnected')
        socket.disconnect(true)
        io.emit('after disconnect', JSON.stringify(getUsers()))
    })

    socket.on('chat message', (msg) => {
        // console.log(msg)
        // message = ''
        // for (var i = 0; i < msg.length; i++) {
        //     char = msg.charAt(i)
        //     if (msg.charCodeAt(i) > 255) {
        //         message += `<span>${char}</span>`
        //     } else if (char == '"') {
        //         // do nothing
        //     } else {
        //         message += char
        //     }
        // }
        io.emit('chat message', socket.name + ": " + msg);
    })

    socket.on('new person', (name) => {
        socket.name = name
        io.emit('new person', JSON.stringify(getUsers()))
    })

    socket.on('typing', () => {
        // console.log('typing')
        io.emit('typing', socket.name + " is typing...") // everyone
        // socket.broadcast.emit('typing', socket.name + " is typing...") // everyone but typer
    })

    socket.on('offinput', () => {
        io.emit('offinput') // everyone
        // socket.broadcast.emit('offinput') // everyone but typer
    })

    function getUsers() {
        users = []
        socketIDs = Object.keys(io.sockets.sockets)
        socketIDs.forEach(socketID => {
            user = {
                id: null,
                name: null
            }
            user.id = socketID
            users.push(user)
        });
        socketValues = Object.values(io.sockets.sockets)
        socketValues.forEach((socketValues, i) => {
            users[i].name = (socketValues.name)
        })
        return users
    }
})

http.listen(port, () => {
    console.log('Listening on *:' + port)
})