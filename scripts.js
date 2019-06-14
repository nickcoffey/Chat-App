$(function() {
    var socket = io()

    $('form').submit((e) => {
        e.preventDefault() // prevents page from reloading
        socket.emit('chat message', $('#m').val())
        $('#m').val('')
        return false
    })

    socket.on('chat message', (msg) =>{
        $('#messages').append($('<li>').text(msg))
    })
})