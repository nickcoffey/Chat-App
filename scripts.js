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
        '&#x1F917;', '&#x1F92D;', '&#x1F92B;', '&#x1F914;',
        '&#x1F910;', '&#x1F928;', '&#x1F610;', '&#x1F611;', '&#x1F636;', '&#x1F60F;', '&#x1F612;', '&#x1F644;', '&#x1F62C;', '&#x1F925;',
        '&#x1F60C;', '&#x1F614;', '&#x1F62A;', '&#x1F924;', '&#x1F634;',
        '&#x1F637;', '&#x1F912;', '&#x1F915;', '&#x1F922;', '&#x1F92E;', '&#x1F927;', '&#x1F635;', '&#x1F92F;',
        '&#x1F920;',
        '&#x1F60E;', '&#x1F913;', '&#x1F9D0;',
        '&#x1F615;', '&#x1F61F;', '&#x1F641;', '&#x2639;', '&#x1F62E;', '&#x1F62F;', '&#x1F632;', '&#x1F633;', '&#x1F626;', '&#x1F627;', '&#x1F628;', '&#x1F630;', '&#x1F625;', '&#x1F622;', '&#x1F62D;', '&#x1F631;', '&#x1F616;', '&#x1F623;', '&#x1F61E;',
        '&#x1F613;', '&#x1F629;', '&#x1F62B;',
        '&#x1F624;', '&#x1F621;', '&#x1F620;', '&#x1F92C;', '&#x1F608;', '&#x1F47F;', '&#x1F480;', '&#x2620;',
        '&#x1F4A9;', '&#x1F921;', '&#x1F479;', '&#x1F47A;', '&#x1F47B;', '&#x1F47D;', '&#x1F47E;', '&#x1F916;']
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
        $('#typing').html('')
        $('#messages').append($('<li class="list-group-item border-0">').html(msg))
        autoScroll()
    })

    // Emit typing
    $('#m').keypress(() => {
        socket.emit('typing')
    })

    $('#m').focusout(() => {
        $('#typing').html('')
    })

    // Listen on typing
    socket.on('typing', (data) => {
        $('#typing').html("<p>" + data + "</p>")
    })
})

function addEmoji(emoji) {
    $('#m').val($('#m').val() + emoji)
}

function autoScroll() {
    document.getElementById('message-row').scrollIntoView(false);
}