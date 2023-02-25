const socket = io()

const btn_send_msg_element = document.getElementById("btn-send-msg")

const textarea_msg_element = document.getElementById("textarea-msg")

btn_send_msg_element.addEventListener("click", (e) => {
    e.preventDefault()
    socket.emit('chat message', textarea_msg_element.value)
})

socket.on("draw message", (msg) =>{
    document.body.innerHTML+=msg
})