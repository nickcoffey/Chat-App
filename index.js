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

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    })
})

http.listen(3000, () => {
    console.log('Listening on *:' + port)
})