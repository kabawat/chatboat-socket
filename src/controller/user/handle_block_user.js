const contactModal = require("#root/database/model/contact");
const userModal = require("#root/database/model/user");
const mongoose = require('mongoose')
async function handle_block_user(data, io) {
    try {
        const blocking_user = await userModal.findOne({ _id: new mongoose.Types.ObjectId(data?.blocked_user) }, 'socketId');
        if (blocking_user) {
            const res_contact = await contactModal.findOne({ _id: new mongoose.Types.ObjectId(data?.chat_id) })
            if (!res_contact) {
                console.log('User not found');
                return;
            }
            if (data.block) {
                res_contact.blocked_by.push(data.blocked_by)
            } else {
                res_contact.blocked_by = res_contact.blocked_by.filter(id => `${id}` != `${data.blocked_by}`)
            }
            await res_contact.save()
            io.to(blocking_user?.socketId).emit("blocked user", data);
        }
    }
    catch (error) {
    }
}
module.exports = handle_block_user