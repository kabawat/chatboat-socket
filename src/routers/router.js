const { Router } = require('express')
const socket_token = require('./token')
const router = Router()

router.get("/", (req, res) => {
    res.send(`<a href='https://kabawat.com'>welcome to kabawat studio</a> <script>window.location.href = "https://kabawat.com"</script>`)
})

router.post("/socket/token", socket_token)
module.exports = router