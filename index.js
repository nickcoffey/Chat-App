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

var idToAssign = 0
var people = []

io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    })

    socket.on('new person', (name) => {
        idToAssign++
        var person = {
            id: idToAssign,
            name: name
        }
        people.push(person)
        console.log(person.name + " registered")
        io.emit('new person', person)
    })
})

http.listen(port, () => {
    console.log('Listening on *:' + port)
})