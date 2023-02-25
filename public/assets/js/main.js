const socket = io()

const btn_send_msg_element = document.getElementById("btn-send-msg")

btn_send_msg_element.addEventListener("click", (e) => {
    e.preventDefault()
    socket.emit('chat message', "pong")
})