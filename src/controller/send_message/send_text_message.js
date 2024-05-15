const chatModal = require("#root/database/model/chat")
const userModal = require("#root/database/model/user")

async function send_text_message(data, io) {
    const user = await userModal.findOne({ _id: data?.receiver }, 'socketId contacts')

    const exists = user.contacts.some(item => item == data?.chat_id)
    if (!exists) {
        const contactList = [...user.contacts, data?.chat_id]
        await userModal.updateOne({ _id: data?.receiver }, { contacts: contactList })
    }
    const chat_format = chatModal({
        receiver: data.receiver,
        sender: data.sender,
        text: data?.text,
        chat_id: data?.chat_id
    })
    const resData = await chat_format.save()
    io.to(user?.socketId).emit("received text", resData)
}
module.exports = send_text_message