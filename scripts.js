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

        var emojis = ['&#x1F600;', '&#x1F603;', '&#x1F604;', '&#x1F601;', '&#x1F606;', '&#x1F605;', '&#x1F923;', '&#x1F602;', '&#x1F642;', '&#x1F643;', '&#x1F609;', '&#x1F60A;', '&#x1F607;', 
        '&#x1F60D;', '&#x1F929;', '&#x1F618;', '&#x1F617;', '&#x1F61A;', '&#x1F619;', 
        '&#x1F60B;', '&#x1F61B;', '&#x1F61C;', '&#x1F92A;', '&#x1F61D;', '&#x1F61D;', '&#x1F911;', 
        '&#x1F917;', '&#x1F92D;', '&#x1F92B;', '&#x1F914;']
        emojis.forEach((emoji) => {
            $('#emoji-collapse').append($(`<button class="btn btn-light" onclick="addEmoji('${emoji}')" type="button">`).html(emoji))
        })
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
        $('#messages').append($('<li class="list-group-item border-0">').html(msg))
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

function addEmoji(emoji) {
    $('#m').val($('#m').val() + emoji)
}

function autoScroll() {
    document.getElementById('message-row').scrollIntoView(false);
}