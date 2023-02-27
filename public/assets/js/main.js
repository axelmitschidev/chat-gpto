const socket = io()

const btn_send_msg_element = document.getElementById("btn-send-msg")
const input_msg_element = document.getElementById("input-msg")
const body_element = document.getElementsByTagName("body")[0]

btn_send_msg_element.addEventListener("click", (e) => {
    e.preventDefault()
    socket.emit('chat message', input_msg_element.value)
    input_msg_element.value=""
})

socket.on("draw message", (msg) => {
    const p_element = document.createElement('p')
    p_element.textContent = msg
    body_element.appendChild(p_element)
})