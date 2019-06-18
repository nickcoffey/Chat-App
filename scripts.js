$(function () {
    var socket = io()

    $(document).ready(function () {
        var name = prompt("Please enter your name:", "")
        socket.emit('new person', name.valueOf())
    })

    socket.on('new person', (person) => {
        localStorage.setItem('person', JSON.stringify(person))
        // console.log(person)
    })

    $('form').submit((e) => {
        e.preventDefault() // prevents page from reloading
        socket.emit('chat message', $('#m').val())
        $('#m').val('')
        return false
    })

    socket.on('chat message', (msg) => {
        $('#messages').append($('<li>').text(JSON.parse(localStorage.getItem('person')).name + ": " + msg))
        removeLi()
    })
})

function removeLi() {
    var items = document.getElementById("messages")
    var itemLength = items.getElementsByTagName("li").length // 18

    if (itemLength > 18) {
        items.removeChild(items.childNodes[0])
    }
}