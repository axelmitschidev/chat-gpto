const socket = io()

const btn_send_msg_element = document.getElementById("btn-send-msg")
const textarea_msg_element = document.getElementById("textarea-msg")
const body_element = document.getElementsByTagName("body")[0]

btn_send_msg_element.addEventListener("click", (e) => {
    e.preventDefault()
    socket.emit('chat message', textarea_msg_element.value)
})

socket.on("draw message", (msg) => {
    const p_element = document.createElement('p')
    p_element.textContent = msg
    body_element.appendChild(p_element)
})