$(function () {
    var socket = io()

    var isWindowActive = false
    var unreadMessages = 0
    var documentTitle = 'Chat App'

    // Active
    window.addEventListener('focus', whenWindowActive)
    function whenWindowActive() {
        isWindowActive = true
        unreadMessages = 0
        document.title = documentTitle
    }

    // Inactive
    window.addEventListener('blur', whenWindowInactive)
    function whenWindowInactive() {
        isWindowActive = false
    }

    // Emit person
    $(document).ready(function () {
        var name = prompt("Please enter your name:", "")
        socket.emit('new person', name.valueOf())
    })

    // Emit message
    $('form').submit((e) => {
        e.preventDefault() // prevents page from reloading
        socket.emit('chat message', $('#m').val())
        $('#m').val('')
        return false
    })

    // Listen on message
    socket.on('chat message', (msg) => {
        if (!isWindowActive) {
            unreadMessages++
            document.title = '(' + unreadMessages + ') ' + documentTitle
        }
        $('#messages').append($('<li>').text(msg))
        autoScroll()
    })

    // Emit typing
    $('#m').keypress(() => {
        socket.emit('typing')
    })

    // // Listen on typing
    // socket.on('typing', (data) => {
    //     $('#typing').html("<p>" + data + "</p>")
    // })
})

function autoScroll() {
    document.getElementById('message-container').scrollIntoView(false);
}